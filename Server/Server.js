const express = require('express')
const cookieParser = require('cookie-parser')
// const mongoose = require("mongoose");
const db = require('./Config/dbconnect')
// const User = require("./Model/user");
const Controller = require("./Controller/productController");
const initRouter = require('./Router')
require('dotenv').config()
const cors = require('cors')

// main().catch(err => console.log(err));

const app = express()
app.use(cors({
    origin : process.env.CLIENT_URL,
    methods : ['POST', 'GET', 'PUT', 'DELETE']
}))
const port = process.env.PORT || 8888
db.connect()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
initRouter(app)

app.listen(port, () => {
    console.log(`server running on the port http://localhost:${port}`)
})

// async function main() {
//     const dbConnect = await mongoose.connect('mongodb://127.0.0.1:27017/shoes_db',
//         {useNewUrlParser: true, 
//           // dbName: 'shoes_db' 
//         });
//     console.log(`db connected ${process.env.MONGODB_URL}`)
//     // console.log(dbConnect);
//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
//   }