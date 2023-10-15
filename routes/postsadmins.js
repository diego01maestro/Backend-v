const router = require('express').Router();
const Admin = require('../models/Admin/Admin')
const PostAdmin = require('../models/Admin/PostAdmin');
const mongoose = require('mongoose');



//CREATE POSTADMIN

router.post("/", async (req, res)=>{
    try{
        const newPost = new PostAdmin(req.body);
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
            const post = await PostAdmin.findById(req.params.id);
            if(post.admin === req.body.admin){
                try{
                    const updatedPost = await PostAdmin.findByIdAndUpdate(req.params.id,
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
        const post = await PostAdmin.findById(req.params.id);
        if(post){
            try{
                await PostAdmin.findByIdAndDelete(req.params.id);
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
//GET POST OF ADMIN

router.get("/:id", async (req, res)=>{
    try
    {    const post = await PostAdmin.findById(req.params.id).sort({createdAt:-1});
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
//GET ALL POSTS OF ADMINS 


router.get("/", async (req, res)=>{
       
    const admin = req.query.admin;
    const catName = req.query.categories;
try
{   
    let posts; 
    if(admin){
        posts = await PostAdmin.find({admin:admin}).sort({createdAt:-1});
    }
    else if(catName){
        posts = await PostAdmin.find({
            categories:{
                $in:[catName]
            }
        }).sort({createdAt:-1});
    }
    else{
        posts = await PostAdmin.find().sort({createdAt:-1});
    }
     res.status(200).json(posts);
}
catch(err){
    res.status(500).json(err);
}}
)


module.exports = router