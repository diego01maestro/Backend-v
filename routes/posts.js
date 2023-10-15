const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const mongoose = require('mongoose');



//CREATE POST

router.post("/", async (req, res)=>{
    try{
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
        
    }
    catch(err){
        res.status(500).json(err);
    }
})
   

//UPDATE POST
router.put("/:id", async (req, res)=>{
        try{
            const post = await Post.findById(req.params.id);
            if(post.username === req.body.username){
                try{
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                        {$set:req.body},
                        {new:true});
                    res.status(200).json(updatedPost)

                }catch(err){
                    res.status(500).json(err)
                }
            } 
            else{
                res.status(401).json('you can only update your post')
            }
        }
        catch(err){
            res.status(500).json(err)
        }

})

//DELETE POST
router.delete("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json('user has been deleted')

            }catch(err){
                res.status(500).json(err)
            }
        } 
        else{
            res.status(401).json('you can only delete your post')
        }
    }
    catch(err){
        res.status(500).json(err)
    }

})



//GET POST

router.get("/:id", async (req, res)=>{
    try
    {    const post = await Post.findById(req.params.id).sort({createdAt:-1});
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json("The post doesn't exist")
        } else{
            res.status(200).json(post);
        }
         
    }
    catch(err){
        res.status(500).json(err);
    }}
    )




/// GET ALL POST
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catNames = req.query.categories; // Change this variable name to catNames (plural)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      let query = {};
  
      if (username) {
        query = { username: username };
      } else if (catNames) {
        // Split the catNames string into an array
        const categories = catNames.split(',');
  
        query = {
          categories: {
            $in: categories, // Use $in to match multiple categories
          },
        };
      }
  
      const skip = (page - 1) * limit;
  
      const posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      const totalPosts = await Post.countDocuments(query);
  
      res.status(200).json({ posts, totalPosts });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  



    





module.exports = router