const request = require('supertest');
const express = require('express');
const assert = require('assert');

const app = express();
let requestCount = 0;

//You have  been the given an express  server  which has a few  endpoints .
//Your task is to create a global middlewares (app.use) which will
//maintain a count of the number of request  mad to the server in the global requestcount variable.

app.use((req , res, next) => {
    requestCount = requestCount + 1;
    next();
});

app.get('/user' , (req ,res) => {
    res.status(200).json({
        name : 'Ashish' ,
    })
})

app.post('/user' , (req ,res) => {
    res.status(200).json({
        msg : 'Created dummy user' ,
    })
})

app.get('/requestCount' , (req ,res) => {
    res.status(200).json({
        requestCount ,
    })
})
app.listen(3000);
module.exports = app;