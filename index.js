'use strict';
const express = require('express');

const app = express()
const port = process.env.PORT || 3001;
app.use(express.json())
const { auth, provider, db } = require("./src/firebase")
const course = require("./courses/course")
const jobsRoute = require("./jobs/jobs")
const bodyParser = require("body-parser")

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res) => res.send('Hello World!'))

// Resgistration system 
app.post("/teacher-signup", async (req, res) => {
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
         .collection("details")
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




});


// singup with firebase 
app.post("/registration", async (req, res) => {
   const { email, password } = req.body

   if (email && password) {
      try {

         const NewUser = await auth.createUserWithEmailAndPassword(
            email,
            password,
         ).then(() => {
            console.log("Registration Success");
            res.status(201).send({
               message: "Registration Success",
               username: email,
               status: 201,
            });
         }).catch((error) => {
            console.log(error.message);
            res.status(400).send(error.message)
         })
         return;
      } catch (error) {

         if (error.code === 11000) {
            res
               .status(409)
               .send({ message: "User Already Registered", status: 409 });
            return;
         } else {
            console.log(error);
            res.status(500).send({
               message: "Something went Worng Please Try Again",
               status: 500,
            });
         }
      }
   } else {
      res.status(400).send({
         message:
            "Request Received with Incomplete Details. username, email, mobile and password are mandatory",
         status: 400,
      });

   }
})
// Login System 


app.post("/login", async (req, res) => {
   const { email, password } = req.body
   if (email && password) {
      try {

         const LogedIN = auth.signInWithEmailAndPassword(email, password)
            .then(() => {
               res.status(201).send("Login Sucess");
            })
            .catch((error) => {
               res.status(400).send(`"Something went worng" ${error}`)
            })
      } catch (error) {
         console.log(error);
         res.send(`There was an error Check Again ${error}`)
      }
   } else {
      res
         .status(400)
         .send({ message: "Request made with incomplete details", status: 400 });
   }
})


// courses routes 
app.use("/course", course)

// Job Routs Here 
app.use("/jobs", jobsRoute)

// google sign in process 
const googleSignIn = () => {
   auth.signInWithPopup(provider).catch(error => alert(error.message))
}



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
