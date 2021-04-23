const express = require('express')
const Router = express.Router();
const { dataBase } = require("../src/firebase")
// get All Jobs 
Router.get('/', async (req, res) => {
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

Router.post("/", async (req, res) => {


   try {
      const ref = dataBase.ref("jobs")
      const DateTime = Date.now()
      const { image, title, timteSchedule, priceRange, priceType, postTime, postCategoy, dolarRange, location, totalBid, endDate } = req.body;
      ref.child(DateTime)
         .set({
            image: image,
            title: title,
            timteSchedule: timteSchedule,
            priceRange: priceRange,
            priceType: priceType,
            postTime: postTime,
            postCategoy: postCategoy,
            dolarRange: dolarRange,
            location: location,
            totalBid: totalBid,
            endDate: endDate
         }).then((result) => {
            res.status(200).send("Job Added to list")
         }).catch((err) => {
            console.log(err);
            res.send("There was an error!Check Again");
         })
   } catch (error) {
      res.send(error)
   }
})


module.exports = Router;