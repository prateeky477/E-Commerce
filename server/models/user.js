const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');  // auth section
const passportLocalMongoose = require("passport-local-mongoose");

// const encrypt = require('mongoose-encryption');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [false, "name must be provided"],
    },
    username: {
        type: String,
        required: [false, "email must be provided"],
        unique: true
    },
    password: {
        type: String,
        required: [false, "password must be provided"],
    },
    phone: {
        type: Number,
    },

    address: {
        type: String,
    },

    pincode: {
        type: Number,
    },
    cart: [{
        pid: {
            type: String,
            required: true
        },
        psize: {
            type: Number,
            required: true
        }
    }],
    credits: {
        type: Number,
        default: 1000, // Set the default value to 1000
    },
    favorites: [{
        pid: {
            type: String,
            required: false
        }
    }]

});

userSchema.plugin(passportLocalMongoose);



// var secret = process.env.SECRET;
// userSchema.plugin(encrypt, { secret: secret , encryptedFields: ['password']});


module.exports = mongoose.model('User', userSchema);


