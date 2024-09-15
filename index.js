const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Answers = require("./models/answers");
const UserModel = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

//Middlewares
require("dotenv").config();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));

// function authMiddleware(req, res, next) {
  // const authHeader = req.headers.authorization || req.headers.Authorization

  // if (!authHeader?.startsWith('Bearer ')) {
  //   return res.status(401).json({message: 'Invalid' })
  // }

  // const token = authHeader.split('')[1]

  // const token = req.cookies.jwt
  // console.log(token);
  // if (token) {
  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //     if (err) {
  //       console.log(err.message);
  //       return res.sendStatus(403);
  //       // return res.redirect("/login");
  //     } else {

  //       req.user = user
  //       console.log(user);
  //       return next();
  //     }
  //   });
  // } else {
  //   return res.redirect("/login");
  // } 

// };

  function authMiddleware(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
      return res.sendStatus(403); // Handle missing token
    }

    // Asynchronous token verification
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err.message);
        return res.redirect("/login"); // Token invalid, redirect to login
      }

      // Token valid, attach user to req object
      req.user = user;
      next(); // Pass control to the next middleware or route handler
    });
  }

mongoose.connect(
  process.env.MONGO_URL
);

app.post("/answers", async (req, res) => {
  const {
    name,
    email,
    phonenumber,
    address,
    dob,
    maritalstatus,
    employmentstatus,
    occupation,
    employername,
    jobtitle,
    highestqualification,
    institution1,
    yearsattended1,
    course1,
    qualification1,
    institution2,
    yearsattended2,
    course2,
    qualification2,
    institution3,
    yearsattended3,
    course3,
    qualification3,
    employerName1,
    employerAddress1,
    yearsEngaged1,
    postHeld1,
    employerName2,
    employerAddress2,
    yearsEngaged2,
    postHeld2,
    employerName3,
    employerAddress3,
    yearsEngaged3,
    postHeld3,
    studyLevel,
    courseChoice,
    preferredCountry,
    travelHistory,
    denialHistory,
    tripBudget,
    sponsor,
    travelPartner,
    travelPartnerList,
    sponsorProvide,
    proofOfFunds,
    howYouHeard
  } = req.body;

  const answersDoc = await Answers.create({
    name,
    email,
    phonenumber,
    address,
    dob,
    maritalstatus,
    employmentstatus,
    occupation,
    employername,
    jobtitle,
    highestqualification,
    institution1,
    yearsattended1,
    course1,
    qualification1,
    institution2,
    yearsattended2,
    course2,
    qualification2,
    institution3,
    yearsattended3,
    course3,
    qualification3,
    employerName1,
    employerAddress1,
    yearsEngaged1,
    postHeld1,
    employerName2,
    employerAddress2,
    yearsEngaged2,
    postHeld2,
    employerName3,
    employerAddress3,
    yearsEngaged3,
    postHeld3, 
    studyLevel,
    courseChoice,
    preferredCountry,
    travelHistory,
    denialHistory,
    tripBudget,
    sponsor,
    travelPartner,
    travelPartnerList,
    sponsorProvide,
    proofOfFunds,
    howYouHeard,
  });
  res.json({ answersDoc });
});


app.post("/register", async (req, res) => {
  // using the .then method to create users//  the try catch block can also be used
  const { username, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10); 
  UserModel.create({ username, password: hashedPass }) 
    .then((users) => res.json(users))
    .catch((err) => {
      if (
        err.code === 11000 && 
        err.keyPattern && 
        err.keyPattern.username === 1 
      ) {
        res
          .status(500)
          .send("Username is Already taken choose another Username");
      }
      console.error(err);
      res.status(500).send("Couldn't create user");
    });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //using the aysnc await function // the .then method can also be used

  const user = await UserModel.findOne({ username });

  try {
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        // compares password passed in from user to our hashed password

        // JWT
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);

        // responds with a cookie carrying the token
        res.cookie("jwt", accessToken, {httpOnly: true, secure: true, sameSite: 'None'});
        res.json({ accessToken: accessToken });

        // frontend receives true or false based on the result from login.
      } else {
        res.json("password incorrect");
      }
    } else {
      res.status(400).send("User does not exist");
    }
  } catch (err) {
    console.log(err);
  }

  const token = req.cookies.jwt;
  console.log(token)    
});

app.get("/admin", async (req, res) => {
  const responses = await Answers.find().populate().sort({ createdAt: -1 });

  res.json(responses);
});









app.listen(4500, () => console.log("Server is running on port 4500"));
