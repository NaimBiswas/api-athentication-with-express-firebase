app.post("/signup", async (req, res) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   const FullAddress = req.body.FullAddress;
   const gender = req.body.gender;
   const dateOfBarth = req.body.dateOfBarth;
   const mobile = req.body.mobile;
   const type = req.body.type;
   const whatsapp = req.body.whatsapp;
   const city = req.body.city;
   const area = req.body.area;
   const pinCode = req.body.pinCode;
   const ClassType = req.body.classType;
   const teacher = await db.collection("details").doc().set(
      {
         name: name,
         email: email,
         password: password,
         mobile: mobile,
         type: type,
         otherDetails: {
            FullAddress: FullAddress,
            gender: gender,
            dateOfBarth: dateOfBarth,
            whatsapp: whatsapp,
            city: city,
            area: area,
            pinCode: pinCode,
            ClassType: ClassType,
            Profile: {
               name: name,
               email: email,
            }
         }
      }
   )


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

});