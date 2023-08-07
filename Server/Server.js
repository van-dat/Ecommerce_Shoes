const express = require('express')
const db = require('../Server/Config/dbconnect')
const cookieParser = require('cookie-parser')
const initRouter = require('./Router')
require('dotenv').config()


const app = express()
const port = process.env.PORT || 8888
db.connect()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
initRouter(app)

app.listen(port, () => {
    console.log(`server running on the port http://localhost:${port}`)
})