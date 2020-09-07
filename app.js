const express = require('express');
const path = require("path");
const mysql = require("mysql");
const methodOverride = require('method-override');
require('dotenv').config()



// Express
const app = express()

// ejs
app.set('view engine', 'ejs');

// Method-override
app.use(methodOverride("_method"));

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Mysql
const db = mysql.createConnection ({    
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

db.connect((err) => {
    if (err) { throw err;}
    console.log('Connecté à la base MySQL, blogvoiture');
});
global.db = db;


//////// Controllers ////////////
// Home
const { homePage } = require("./controllers/home")
// Cars
const { getSingleCar, getEditPage, postEditPage, getCreateCar, postCreateCar } = require('./controllers/car')



//////// Routes //////////
// Home 
app.get("/", homePage)
// Cars
app.get("/car/create", getCreateCar)
app.post("/car/create", postCreateCar)
app.get("/car/:id", getSingleCar)
app.get("/car/edit/:id", getEditPage)
app.post("/car/edit/:id", postEditPage)






app.listen(3000, function(){
    console.log("le serveur écoute le port 3000");
})