//Basic MongoDB connection
// to install - npm install mongoose --save

const mongoose = require('mongoose');

mongoose.connect('DATABASE_URL/test'); //Test is the name of the database

const User = mongoose.model('User' ,
 {
    name : String,
    email : String,
    password : String 
 });

 const user = new User({
    name : 'Ashish',
    email : 'ashish@getMaxListeners.com',
    password : '123445'
 });

 user.save(); //save the user to the database

 //to run this file - node 02mongodbConnection.js
 // to check the database - go to the mongoDB Compass and check the database.