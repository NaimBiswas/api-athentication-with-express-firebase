const express = require("express")
const Router = express.Router()
const { db } = require("../src/firebase")

Router.post("/", async (req, res) => {
   try {
      const { name, mobile, email, area, fullAddress, whatsApp, city, pinCode, classType, fees, segment, sameAsMobile

      } = req.body

      const {
         fullName, dateOfBarth, areaPinCode, phoneNumber, communicationAddress
      } = req.body.basicDetails


      const {
         cardType, cardHolderName, cardNumber, cvc, expiryMonth, expiryYear
      } = req.body.basicDetails.paymentInformation




      const teacher = await
         db
            .collection("instituteDetails")
            .doc()
            .set(
               {
                  name: name,
                  mobile: mobile,
                  email: email,
                  area: area,
                  fullAddress: fullAddress,
                  whatsApp: whatsApp,
                  sameAsMobile: sameAsMobile,
                  city: city,
                  pinCode: pinCode,
                  classType: classType,
                  segment: segment,
                  fees: fees,
                  basicDetails: {
                     fullName: fullName,
                     dateOfBarth: dateOfBarth,
                     areaPinCode: areaPinCode,
                     phoneNumber: phoneNumber,
                     communicationAddress: communicationAddress,
                     paymentInformation: {
                        cardType: cardType,
                        cardHolderName: cardHolderName,
                        cardNumber: cardNumber,
                        cvc: cvc,
                        expiryMonth: expiryMonth,
                        expiryYear: expiryYear,
                     }
                  }
               }
            ).then(result => {

               res.status(200).send("Profile Updated")
            }).catch((err) => {
               console.log(err);
               res.send(err)
            })
   } catch (error) {
      console.log(error);
   }
})


module.exports = Router