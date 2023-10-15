const router = require('express').Router();
const Newsletter = require('../models/Newsletter');


//CREATE NEWSLETTER
router.post("/", async (req, res)=>{
    const newLetter = new Newsletter(req.body);
    try{
        const savedLetter = await newLetter.save();
        res.status(200).json(savedLetter)

    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL NEWSLETTER
router.get("/", async (req, res)=>{
    try{
        const letters = await Newsletter.find();
        res.status(200).json(cats)

    }catch(err){
        res.status(500).json(err);
    }
})








module.exports = router