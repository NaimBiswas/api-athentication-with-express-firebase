const express = require('express')
const { dataBase } = require("../src/firebase")
const Router = express.Router();



Router.get('/', async (req, res) => {
   try {
      await dataBase.ref("courses").once("value")
         .then((data) => {
            console.log(data.val());
            res.send(data.val())
         }).catch(err => {
            console.log(err);
         })

   } catch (error) {

   }

})

module.exports = Router