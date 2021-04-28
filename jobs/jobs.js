const express = require('express')
const app = express()
const Router = express.Router();
const { dataBase } = require("../src/firebase")
const cors = require("cors")
app.use(cors());
// get All Jobs 
Router.get('/', async (req, res,) => {

   try {

      const AllDate = await dataBase.ref("jobs").once("value")
         .then((data) => {
            if (data.val()) {
               res.status(201).json(data)
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
      let DateTime = Date.now()

      const { title, description, skill, employemnt, jobType, } = req.body;
      const { cardHolderName, cardType, ExpiryDate, cvc, cardNumber } = req.body.paymentInformtation

      console.log(req.body.paymentInformtation);
      await ref.child(DateTime)
         .set({
            title: title,
            description: description,
            skill: skill,
            employemnt: employemnt,
            jobType: jobType,
            paymentInformtation: {
               cardHolderName: cardHolderName,
               cardType: cardType,
               ExpiryDate: ExpiryDate,
               cvc: cvc,
               cardNumber: cardNumber,
            }
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