const express = require('express')
const Router = express.Router();
const { dataBase } = require("../src/firebase")
// get All Jobs 
Router.get('/', async (req, res) => {
   try {
      dataBase.ref("jobs").once("value")
         .then((data) => {
            if (data.val()) {
               console.log(data.val());
               res.send(data.val())
            } else {
               res.send("NO JOBS FOUNDS")
               console.log("NO JOBS FOUNDS")
            }
         }).catch(err => {
            console.log(err);
         })
   } catch (error) {
      console.log(error);
   }
})

module.exports = Router;