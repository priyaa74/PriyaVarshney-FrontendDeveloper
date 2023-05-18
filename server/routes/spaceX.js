const axios= require('axios');
const express= require('express');

const spaceXRouter= express.Router();

spaceXRouter.get('/spaceX/capsules',async(req,res)=>{
    try{
        const response= await axios.get('https://api.spacexdata.com/v3/capsules');
        const data= response.data;
        res.json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'An unexpected error occured'});

    }
});

spaceXRouter.get('/spaceX/capsules/capsules_serial',async(req,res)=>{
    try{
        const response= await axios.get(`https://api.spacexdata.com/v3/capsules?capsule_serial=${serial}`);
        const data= response.data;
        res.json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'An unexpected error occured'});

    }
});

spaceXRouter.get('/spaceX/capsules/capsule_id',async(req,res)=>{
    try{
        const response= await axios.get(`https://api.spacexdata.com/v3/capsules?capsule_id=${id}`);
        const data= response.data;
        res.json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'An unexpected error occured'});

    }
});
spaceXRouter.get('/spaceX/capsules/status',async(req,res)=>{
    try{
        const response= await axios.get(`https://api.spacexdata.com/v3/capsules?status=${inputStatus}`);
        const data= response.data;
        res.json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'An unexpected error occured'});

    }
});

module.exports = {spaceXRouter};

// https://api.spacexdata.com/v3/capsules?capsule_serial=C112