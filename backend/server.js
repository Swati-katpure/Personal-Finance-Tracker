const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());

// ======================
// MONGODB CONNECTION
// ======================

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected");
})

.catch((err) => {

  console.log(err);
});

// ======================
// USER SCHEMA
// ======================

const UserSchema = new mongoose.Schema({

  name:String,

  email:String,

  password:String
});

const User = mongoose.model(
  "User",
  UserSchema
);

// ======================
// SIGNUP API
// ======================

app.post("/signup", async (req,res)=>{

  try{

    const {name,email,password}
      = req.body;

    // CHECK EXISTING USER

    const existingUser =
      await User.findOne({
        email
      });

    if(existingUser){

      return res.status(400).json({

        message:"User Already Exists"
      });
    }

    // CREATE USER

    const user = new User({

      name,
      email,
      password
    });

    await user.save();

    res.json({

      message:"Signup Successful"
    });

  }catch(err){

    console.log(err);

    res.status(500).json({

      message:"Signup Error"
    });
  }
});

// ======================
// LOGIN API
// ======================

app.post("/login", async (req,res)=>{

  try{

    const {email,password}
      = req.body;

    const user =
      await User.findOne({

        email,
        password
      });

    if(user){

      res.json({

        message:"Login Successful"
      });

    }else{

      res.status(401).json({

        message:"Invalid Email or Password"
      });
    }

  }catch(err){

    console.log(err);

    res.status(500).json({

      message:"Login Error"
    });
  }
});

// ======================
// SERVER
// ======================

app.listen(5000,()=>{

  console.log(
    "Server running on port 5000"
  );
});