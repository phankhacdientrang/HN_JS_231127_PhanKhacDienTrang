const express = require("express")
const app = express()
const cors = require('cors')
const router = require('./routers/home')
const bodyParser = require('body-parser')
const port = 8080

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/",router)

app.listen(port)