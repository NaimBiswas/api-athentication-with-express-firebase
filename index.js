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
app.post("/signup", async (req, res) => {
   const { name, email, password, mobile, type, } = req.body

   const { fullAddress, gender, dateOfBarth, whatsApp, city, area, pinCode, classType } = req.body.otherDetails

   const teacher = await
      db
         .collection("details")
         .doc()
         .set({
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            type: type,
            otherDetails: {
               fullAddress: fullAddress,
               gender: gender,
               dateOfBarth: dateOfBarth,
               whatsApp: whatsApp,
               city: city,
               area: area,
               pinCode: pinCode,
               classType: classType,

            }
         })




});


// singup with firebase 
app.post("/signup", async (req, res) => {
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
            res.send(error.message)
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
module.exports.handler = serverless(app);