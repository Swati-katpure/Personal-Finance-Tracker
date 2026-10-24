import React, {

  useState

} from "react";

import axios from "axios";

function Login() {

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleLogin =
    async () => {

      try {

        const res =
          await axios.post(

            "http://localhost:5000/login",

            {

              email,

              password
            }
          );

        alert(
          "Login Successful"
        );

        window.location.href =
          "/dashboard";

      }

      catch (err) {

        alert(
          "Login Failed"
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
        "linear-gradient(135deg,#0f172a,#111827,#1e293b)"
      }}
    >

      {/* LOGIN CARD */}

      <div
        style={{

          width:"350px",

          padding:"35px",

          borderRadius:"20px",

          background:
          "rgba(30,41,59,0.85)",

          backdropFilter:
          "blur(12px)",

          border:
          "1px solid rgba(255,255,255,0.1)",

          boxShadow:
          "0 8px 25px rgba(0,0,0,0.3)",

          display:"flex",

          flexDirection:"column",

          alignItems:"center"
        }}
      >

        {/* TITLE */}

        <h1
          style={{

            marginBottom:"25px",

            fontSize:"32px",

            background:
            "linear-gradient(90deg,#38bdf8,#22c55e)",

            WebkitBackgroundClip:"text",

            WebkitTextFillColor:"transparent"
          }}
        >
          Welcome Back
        </h1>

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

            padding:"14px",

            marginBottom:"15px",

            border:"none",

            borderRadius:"12px",

            background:"#334155",

            color:"white",

            fontSize:"14px",

            outline:"none"
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

            padding:"14px",

            marginBottom:"20px",

            border:"none",

            borderRadius:"12px",

            background:"#334155",

            color:"white",

            fontSize:"14px",

            outline:"none"
          }}
        />

        {/* LOGIN BUTTON */}

        <button

          onClick={handleLogin}

          style={{

            width:"100%",

            padding:"14px",

            border:"none",

            borderRadius:"12px",

            background:
            "linear-gradient(135deg,#2563eb,#38bdf8)",

            color:"white",

            fontSize:"15px",

            fontWeight:"bold",

            cursor:"pointer",

            transition:"0.3s",

            boxShadow:
            "0 4px 15px rgba(37,99,235,0.4)"
          }}
        >

          Login

        </button>

        {/* SIGNUP LINK */}

        <p
          style={{

            marginTop:"20px",

            color:"#cbd5e1"
          }}
        >

          New User?

          <a
            href="/signup"

            style={{

              color:"#38bdf8",

              marginLeft:"6px",

              textDecoration:"none",

              fontWeight:"bold"
            }}
          >

            Signup

          </a>

        </p>

      </div>

    </div>
  );
}

export default Login;