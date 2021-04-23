const express = require('express')
const Router = express.Router();
const { dataBase } = require("../src/firebase")
// get All Jobs 
Router.get('/get-jobs', async (req, res) => {
   try {
      await dataBase.ref("jobs").once("value")
         .then((data) => {
            if (data.val()) {
               console.log(data.val());
               res.status(200).send(data.val())
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
});

// Route for post job requst 
Router.post("/post-job", async (req, res) => {
   try {
      res.send("This is job post Request")
   } catch (error) {
      res.send(error)
   }
})


module.exports = Router;