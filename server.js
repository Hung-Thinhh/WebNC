import express from 'express'
import myDateTime from "./date"
import viewEngine from "./viewEngine"
import {getPath, getParamsURL} from "./getUrl"
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8080
viewEngine(app)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/date', (req, res) => {
    res.send(`Hello World!. ${myDateTime()}`)
})
app.get('/geturl', (req, res) => {
    res.send(`Hello World!. ${getPath(req)},${getParamsURL(req)}`)
})
app.get('/ejs', (req, res) => {
    res.render("test")
})
app.get('/about', (req, res) => {
    res.render("about")
})
app.get('/home', (req, res) => {
    res.render("home")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})