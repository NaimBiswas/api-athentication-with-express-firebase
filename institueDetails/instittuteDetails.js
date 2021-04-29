const express = require("express")
const Router = express.Router()
const { db } = require("../src/firebase")

Router.post("/", async (req, res) => {
   try {
      const { name, gender, mobile, email, area, fullAddress, yearOfBarth, whatsApp, city, pinCode, classType, segments,
         fees,

      } = req.body
      const
         { education, institueName,
            tuitorExp, tuitorExpDetails, tuitorApprochDetails,
         } = req.body.profile

      const {
         fullName, dateOfBarth, communicationAddress, baPinCode, phone,
      } = req.body.basicDetails
      const {
         cardType, cardHolderName, cardNumber, cvc, expDate
      } = req.body.basicDetails.paymentInformation
      const teacher = await
         db
            .collection("instituteDetails")
            .doc()
            .set(
               {
                  name: name,
                  gender: gender,
                  mobile: mobile,
                  email: email,
                  area: area,
                  fullAddress: fullAddress,
                  yearOfBarth: yearOfBarth,
                  whatsApp: whatsApp,
                  city: city,
                  pinCode: pinCode,
                  classType: classType,
                  segments: segments,
                  fees: fees,
                  profile: {
                     education: education,
                     institueName: institueName,
                     tuitorExp: tuitorExp,
                     tuitorExpDetails: tuitorExpDetails,
                     tuitorApprochDetails: tuitorApprochDetails,
                  },
                  basicDetails: {
                     fullName: fullName,
                     dateOfBarth: dateOfBarth,
                     communicationAddress: communicationAddress,
                     baPinCode: baPinCode,
                     phone: phone,
                     paymentInformation: {
                        cardType: cardType,
                        cardHolderName: cardHolderName,
                        cardNumber: cardNumber,
                        cvc: cvc,
                        expDate: expDate
                     }
                  }
               }
            ).then(result => {
               console.log(result);
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