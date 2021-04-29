const express = require("express")
const Router = express.Router();
const { db } = require("../src/firebase")
Router.post("/", async (req, res) => {
   try {
      const {
         skills, education, experience, employementType, memberShip,
      } = req.body
      const {
         fullName, dateOfBarth, communicationAddress, areaPinCode, phoneNumber
      } = req.body.basicDetails
      const {
         cardType, cardHolderName, cardNumber, cvc, expiryDate
      } = req.body.basicDetails.paymentInformation


      const Data = await db.collection("exployeeSkill")
         .doc()
         .set({
            skills: skills,
            education: education,
            experience: experience,
            employementType: employementType,
            memberShip: memberShip,
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
         }).then((result) => {
            res.status(200).send("Skill Added to profile")

         }).catch((err) => {
            console.log(err);
         })

   } catch (error) {
      console.log(error);
   }
})



module.exports = Router