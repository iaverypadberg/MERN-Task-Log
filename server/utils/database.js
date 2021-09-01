const mongoose = require('mongoose');

const url = process.env.MONGO_DB_CONNECTION_STRING
const connect = mongoose.connect('mongodb://localhost:27017/tasks',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
connect
    .then(db => {
        console.log("Mongo connection open.")
    })
    .catch(err => {
        console.log("Mongo connection failed.")
        console.log(err)
    });

