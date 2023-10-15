const express = require('express');
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    admin:{
        type: String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default:" ",
    },
    biography:{
        type:String,
        default:" ",
    },
}, {timestamps:true});


module.exports = mongoose.model("Admin", AdminSchema);

