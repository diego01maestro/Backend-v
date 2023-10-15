const express = require('express');
const mongoose = require('mongoose');

const PostAdminSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        unique:true,
    },
    desc :{
        type:String,
        required:true, 
    },
    photo:{
        type:String,
        required:false,
    },
    admin:{
        type:String,
        required:true,
    },
    categories:{
        type: Array,
        required: true,
    }
}, {timestamps:true});


module.exports = mongoose.model("PostAdmin", PostAdminSchema);