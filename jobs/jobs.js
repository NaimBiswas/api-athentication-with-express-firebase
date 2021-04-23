const express = require('express')
const Router = express.Router();
// get All Jobs 
Router.get('/', async (req, res) => {
   try {
      res.send("This is job routes");
   } catch (error) {

   }
})

module.exports = Router;