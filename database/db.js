const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://priyanka:priyanka@cluster0.z38zz.mongodb.net/merntest?retryWrites=true&w=majority';
mongoose.connect(DB_URL, { useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false  }).then(con => {
    console.log("Database server is connected")
}).catch(err => {
    console.log("Erronr in connection", err)
})

