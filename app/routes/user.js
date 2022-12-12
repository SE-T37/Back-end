const { Router } = require('express');
const express = require('express');

const router=express.Router();

const userController= require('./controllers/user');

Router.post('/user', userController.newUser);
// sostituisci con il login, aggiungi i controllers

module.exports =router;
// esporto per usarlo in server 