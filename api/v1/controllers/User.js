const UserModel = require('../models/User')
const mongoose = require("mongoose")
const UserController = {}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const fs = require('fs')

const ENC_KEY = "jporueojl,vmx,.v[aoijldnv]"

UserController.register = (req, res)=>{
     console.log(req.body)
   
    let {name, email,contact, password,confirm_password,gender, hobbies} = req.body
    
    let profilePic = req.files.profilePic
    console.log(profilePic)
    
    let uploadPath = __dirname+'/uploads/'

    let splitted = profilePic.name.split(".")
    console.log(uploadPath)


    let fileExt = splitted[splitted.length-1]
    let fName = moment().unix()+"."+fileExt
    uploadPath += fName
    console.log(uploadPath)
    
   profilePic.mv(uploadPath ,(err)=>{
       if(err){
           res.send('err')
           console.log(err)
       }else{
           //save data into database
           UserModel.findOne({email}).then(async dbres=>{
            if(dbres != null){
                //email already exist
               res.send({status:"ERR", msg:"This email is already exist", data:[]})
           }else{
               //user does not exist
               let pwd = await bcrypt.hash(password,10)
               //  console.log("pwd is " pwd )
               let user = new UserModel({name, 
                email, contact, 
                password: pwd,
                 confirm_password:pwd, gender, hobbies,
                 profilePic:new Buffer(fs.readFileSync(uploadPath)).toString('base64')
                })
       
               user.save().then(dbres =>{
                   //data saved successfully
                    res.send({status:"OK", msg:"Data Saved Successfully", data:dbres})
               }).catch(err =>{
                   //error in data saving
                   console.log(err)
                   res.send({status:"ERR", msg:"Something went wrong", data:[] })
               })
           }
           }).catch(err =>{
               console.log(err)
               res.send({status:"ERR", msg:"Something went wrong", data:[]})
           })
          

       }
   })
  
     
    
}

UserController.login = async(req, res)=>{
    let {email , password} = req.body

    let dbData = await UserModel.findOne({ email })
    if(dbData != null){
        let dbpwd = dbData['password']
        // console.log(dbpwd)

        let isSame = await bcrypt.compare(password, dbpwd)
        let { _id, name} = dbData
        if(isSame){
             //authentication success
             let token = await jwt.sign({id: _id}, ENC_KEY)
             res.send({status:"OK",msg:"Successfully logged in", data:[{token, name}]})
         }else{
             //authentication failed
             res.send({status:"ERR", msg:"Invalid username or password"})
        }
    }else{
        res.send({status:"ERR", msg:"Invalid username or email"})
    }
}

module.exports = UserController