const express = require('express')

const Router = express.Router();

Router.get('/', (req, res) => {
   console.log("Hello Thisis coruses world ");
   res.send("This is courses world")
})

module.exports = Router