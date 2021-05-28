const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload');




require('./database/db')

const userRouter = require('./api/v1/router/User') 

const app = express()
app.use(cors())
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ extended: false }))
app.use("/uploads", express.static(__dirname+'/uploads'))


app.use('/user', userRouter)

app.listen(3300,()=>{
    console.log("server is running at port 3300")
})