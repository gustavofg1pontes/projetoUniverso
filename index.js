//jshint esversion:6
const express = require('express');
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("assets"));

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/SistemaSolar', (req, res) => {
    res.render('sistema');
});

app.listen(3000, () => console.log("localhost:3000"))