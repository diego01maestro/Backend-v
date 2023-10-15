const express = require('express');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required:true,
        unique:true,
        minlength: 6,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        minlength: 6,
    },
    profilepic:{
        type:String,
        default:" ",
    },
    biography:{
        type:String,
        default:" ",
    },
    facebook:{
        type:String,
        default:" ",
    },
    twitter:{
        type:String,
        default:" ",
    },
    web:{
        type:String,
        default:" ",
    },
}, {timestamps:true});


module.exports = mongoose.model("User", UserSchema);

