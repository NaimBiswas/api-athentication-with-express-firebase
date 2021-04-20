const express = require('express')

const app = express()
const port = 3000
app.use(express.json())
const { auth } = require("./src/firebase")
app.get('/', (req, res) => res.send('Hello World!'))

// Resgistration system 
app.post("/signup", async (req, res) => {
   const { Email, Password } = req.body
   if (Email && Password) {
      try {

         const NewUser = await auth.createUserWithEmailAndPassword(
            Email,
            Password,
         ).then(() => {
            console.log("Registration Success");
            res.status(201).send({
               message: "Registration Success",
               username: Email,
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

});

// Login System 


app.post("/login", async (req, res) => {
   try {
      const email = req.body.email;
      const password = req.body.password;
      const LogedIN = auth.signInWithEmailAndPassword(email, password).then(() => {
         res.status(201).send("Login Sucess");
      }).catch((error) => {
         res.status(400).send(`"Something went worng" ${error}`)
      })
   } catch (error) {
      console.log(error);
      res.send(`There was an error Check Again ${error}`)
   }
})








app.listen(port, () => console.log(`Example app listening on port port!`))