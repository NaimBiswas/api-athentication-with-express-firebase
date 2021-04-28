const express = require("express")
const Router = express.Router();
const { db } = require("../src/firebase")

Router.post("/studen-details", async (req, res) => {

   try {
      const {
         subjects,
         city,
         area,
         placeOfTuition, learningRequirment,
      } = req.body
      const { fullName, dateOfBarth, communicationAddress, areaPinCode, phoneNumber } = req.body.basicDetails
      const { cardType, cardHolderName, cardNumber, cvc, expiryDate } = req.body.basicDetails.paymentInformation
      const data = await
         db.collection("studentDetails")
            .doc()
            .set({
               subjects: subjects,
               city: city,
               area: area,
               placeOfTuition: placeOfTuition,
               learningRequirment: learningRequirment,
               basicDetails: {
                  fullName: fullName,
                  dateOfBarth: dateOfBarth,
                  communicationAddress: communicationAddress,
                  areaPinCode: areaPinCode,
                  phoneNumber: phoneNumber,
                  paymentInformation: {
                     cardType: cardType,
                     cardHolderName: cardHolderName,
                     cardNumber: cardNumber,
                     cvc: cvc,
                     expiryDate: expiryDate
                  }
               }
            }).then(result => {
               res.status(200).send("Students Profile Updated")
            }).catch(err => {
               console.log(err);
               res.status(401).send("Some went Wrong Try Again Later")
            })
   } catch (error) {
      console.log(error);
   }
})

module.exports = Router