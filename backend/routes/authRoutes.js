const express =
require("express");

const router =
express.Router();

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const User =
require("../models/User");

// ======================
// SIGNUP
// ======================

router.post(
  "/signup",

  async (req, res) => {

    try {

      const {

        name,

        email,

        password

      } = req.body;

      // CHECK USER

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400)
          .json({
            message:
              "User already exists"
          });
      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER

      const newUser =
        new User({

          name,

          email,

          password:
            hashedPassword
        });

      await newUser.save();

      res.status(201)
        .json({
          message:
            "Signup successful"
        });

    } catch (error) {

      console.log(error);

      res.status(500)
        .json({
          message:
            "Server Error"
        });
    }
  }
);

// ======================
// LOGIN
// ======================

router.post(
  "/login",

  async (req, res) => {

    try {

      const {

        email,

        password

      } = req.body;

      // CHECK USER

      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(400)
          .json({
            message:
              "User not found"
          });
      }

      // CHECK PASSWORD

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400)
          .json({
            message:
              "Invalid password"
          });
      }

      // TOKEN

      const token =
        jwt.sign(

          {
            id:
              user._id
          },

          "secret123"
        );

      res.json({

        token,

        user
      });

    } catch (error) {

      console.log(error);

      res.status(500)
        .json({
          message:
            "Server Error"
        });
    }
  }
);

module.exports =
router;