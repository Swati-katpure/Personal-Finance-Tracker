import React, {

  useState

} from "react";

import axios from "axios";

function Signup() {

  const [name,
    setName] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleSignup =
    async () => {

      try {

        await axios.post(

          "http://localhost:5000/signup",

          {

            name,

            email,

            password
          }
        );

        alert(
          "Signup Successful"
        );

        window.location.href =
          "/";

      }

      catch (err) {

        alert(
          "Signup Failed"
        );
      }
    };

  return (

    <div
      style={{

        height:"100vh",

        display:"flex",

        justifyContent:"center",

        alignItems:"center",

        background:
        "linear-gradient(135deg,#020617,#0f172a,#1e293b)",

        overflow:"hidden"
      }}
    >

      {/* BACKGROUND GLOW */}

      <div
        style={{

          position:"absolute",

          width:"350px",

          height:"350px",

          background:"#2563eb",

          filter:"blur(140px)",

          opacity:"0.25",

          top:"-100px",

          left:"-100px"
        }}
      />

      <div
        style={{

          position:"absolute",

          width:"300px",

          height:"300px",

          background:"#22c55e",

          filter:"blur(140px)",

          opacity:"0.2",

          bottom:"-100px",

          right:"-100px"
        }}
      />

      {/* SIGNUP CARD */}

      <div
        style={{

          width:"380px",

          padding:"40px",

          borderRadius:"24px",

          background:
          "rgba(15,23,42,0.75)",

          backdropFilter:
          "blur(16px)",

          border:
          "1px solid rgba(255,255,255,0.08)",

          boxShadow:
          "0 10px 40px rgba(0,0,0,0.45)",

          display:"flex",

          flexDirection:"column",

          alignItems:"center",

          position:"relative",

          zIndex:"1"
        }}
      >

        {/* ICON */}

        <div
          style={{

            width:"75px",

            height:"75px",

            borderRadius:"50%",

            background:
            "linear-gradient(135deg,#2563eb,#38bdf8)",

            display:"flex",

            justifyContent:"center",

            alignItems:"center",

            fontSize:"34px",

            marginBottom:"20px",

            boxShadow:
            "0 6px 18px rgba(37,99,235,0.4)"
          }}
        >
          ✨
        </div>

        {/* TITLE */}

        <h1
          style={{

            margin:"0",

            fontSize:"34px",

            fontWeight:"bold",

            background:
            "linear-gradient(90deg,#38bdf8,#22c55e)",

            WebkitBackgroundClip:"text",

            WebkitTextFillColor:"transparent"
          }}
        >
          Create Account
        </h1>

        <p
          style={{

            color:"#94a3b8",

            marginTop:"8px",

            marginBottom:"28px",

            fontSize:"14px"
          }}
        >
          Signup to manage your finance easily
        </p>

        {/* NAME */}

        <input

          type="text"

          placeholder="Enter Name"

          value={name}

          onChange={(e)=>
            setName(
              e.target.value
            )
          }

          style={{

            width:"100%",

            padding:"15px",

            marginBottom:"16px",

            border:"1px solid rgba(255,255,255,0.08)",

            borderRadius:"14px",

            background:"#1e293b",

            color:"white",

            fontSize:"14px",

            outline:"none",

            boxSizing:"border-box"
          }}
        />

        {/* EMAIL */}

        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }

          style={{

            width:"100%",

            padding:"15px",

            marginBottom:"16px",

            border:"1px solid rgba(255,255,255,0.08)",

            borderRadius:"14px",

            background:"#1e293b",

            color:"white",

            fontSize:"14px",

            outline:"none",

            boxSizing:"border-box"
          }}
        />

        {/* PASSWORD */}

        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }

          style={{

            width:"100%",

            padding:"15px",

            marginBottom:"22px",

            border:"1px solid rgba(255,255,255,0.08)",

            borderRadius:"14px",

            background:"#1e293b",

            color:"white",

            fontSize:"14px",

            outline:"none",

            boxSizing:"border-box"
          }}
        />

        {/* SIGNUP BUTTON */}

        <button

          onClick={handleSignup}

          style={{

            width:"100%",

            padding:"15px",

            border:"none",

            borderRadius:"14px",

            background:
            "linear-gradient(135deg,#2563eb,#38bdf8)",

            color:"white",

            fontSize:"16px",

            fontWeight:"bold",

            cursor:"pointer",

            transition:"0.3s",

            boxShadow:
            "0 6px 18px rgba(37,99,235,0.4)"
          }}
        >

          Signup

        </button>

        {/* LOGIN */}

        <p
          style={{

            marginTop:"22px",

            color:"#cbd5e1",

            fontSize:"14px"
          }}
        >

          Already have account?

          <a
            href="/"

            style={{

              color:"#38bdf8",

              marginLeft:"6px",

              textDecoration:"none",

              fontWeight:"bold"
            }}
          >

            Login

          </a>

        </p>

      </div>

    </div>
  );
}

export default Signup;