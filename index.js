const express = require('express')

const app = express()
const port = 3000
app.use(express.json())
const { auth } = require("./src/firebase")
app.get('/', (req, res) => res.send('Hello World!'))

// Resgistration system 
app.post("/signup", async (req, res) => {
   try {
      const Email = req.body.email;
      let Password = req.body.password;

      const NewUser = await auth.createUserWithEmailAndPassword(
         Email,
         Password,
      ).then(() => {
         console.log("LogIN Success");
      }).catch((error) => {
         console.log(error);
      })
      console.log(NewUser);
      res.send("Login Success")
   } catch (error) {
      res.send("There was an error")
      console.log(error);
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