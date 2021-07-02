const express = require("express");
const { request } = require("http");
const path = require("path");
const bodyparser = require("body-parser")
const fs= require("fs")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});



//for serving static file
const app=express();
const port=80;


//define mongoose scheme
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    addrss: String
  });

  const contact = mongoose.model('contact', contactSchema);


//EXPRESS   SPECFIC STUFF
app.use('/static', express.static('static')); //for serving static file
app.use(express.urlencoded())//to bring form data to express



//PUG SPECFIC STUFF
app.set('view engine', 'pug');//set template engine for pug
app.set('views', path.join(__dirname, 'views'))//set the view directory

//ENDPOINTS
app.get('/',(req, res) => {
   
    const params= {}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req, res) => {
   
    const params= {}
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req, res) => {
   
    var mydata= new contact(req.body);
    mydata.save().then(() =>{
        res.send("This data has been saved in data base")
    }).catch(() =>{
        res.status(400).send("Data couldnot be saved")
    })
})

//START THE SERVER 
app.listen(port, ()=>{ 
    console.log(`The application started successfully on port ${port}`);
})