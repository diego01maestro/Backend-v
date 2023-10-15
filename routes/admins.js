const router = require('express').Router();
const Admin = require('../models/Admin/Admin');
const PostAdmin = require('../models/Admin/PostAdmin')
const User = require('../models/User');


//DELETE USER
router.delete("/:id", async (req, res)=>{

    if(req.body.adminId === req.params.id){
        try
        {   const user = await User.findById(req.params.id);
            try{
            await Post.deleteMany({username:user.username});
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('user has been deleted...')
        }
        catch(err)
        {
            res.status(500).json(err)
        }}
        catch(err){
            res.status(404).json("user not found");
        }
    }
    else{
        res.status(401).json("You can only Delete your account")
    }

})

