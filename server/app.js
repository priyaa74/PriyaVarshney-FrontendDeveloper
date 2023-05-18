const express = require("express")
const connectDb= require("./config/config")
const cors= require("cors");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


const {UserModel} = require("./models/users")
const {spaceXRouter} = require('./routes/spaceX')
const { auth } = require("./middleware/auth");
const app = express();
app.use(express.json());
app.use(cors());

function logRequest(req,res,next){
    next();
    console.log(new Date(),req.method,req.url);
}
app.use(logRequest);

app.post("/users/register", async (req, res) => {
    const {name, email, password} = req.body;
    const userPresent = await UserModel.findOne({email})
    if(userPresent){
        return res.status(400).send({
            error:`User with ${email} already exists`
        })
    }
    try{
        bcrypt.hash(password, 4, async function(err, hash) {
            const user = new UserModel({name, email, password:hash})
            await user.save()
            res.send("Sign up successfull")
        });
       
    }
   catch(err){
        console.log(err)
        res.send("Something went wrong, pls try again later")
   }
})

app.post("/users/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.find({email})
         
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'hush');
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login failed")
            }
      })} 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong, please try again later")
    }
})



app.use(auth)
app.use("/api", spaceXRouter)

connectDb()
.then(()=>{
    app.listen(4000,()=>{
        console.log("server is listening at port 4000")
    })
})

