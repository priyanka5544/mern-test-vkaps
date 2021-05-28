const jwt = require('jsonwebtoken')

const ENC_KEY = "jporueojl,vmx,.v[aoijldnv]"

let checkToken = async(req, res, next)=>{
    let {token} = req.headers
    let decoded = null

    try{
        decoded = await jwt.verify(token, ENC_KEY)
    } catch(e){
        return res.send({status:"ERR", msg: "Invalid Authentication Token"})
    }

    req.decoded = decoded

    next()
}
   
   module.exports = {checkToken}