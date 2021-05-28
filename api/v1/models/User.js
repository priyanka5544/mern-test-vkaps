const mongoose = require('mongoose')

const Schema = mongoose.Schema

// const hobbies = new Schema({
//     name:String,
//     value:String
// })

const userSchema = new Schema({
    name:String,
    email:String,
    hobbies:Array,
    // hobbies:hobbies,
    gender:String,
    profilePic:String, 
    password:String,
    confirm_password:String,
    contact:Number
},{timestamps:true})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel