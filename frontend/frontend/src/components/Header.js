import React, {
  useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import {
  FaMoon,
  FaSun
} from "react-icons/fa";

function Header() {

  const navigate =
    useNavigate();

  // ==========================
  // LOAD SAVED THEME
  // ==========================

  useEffect(() => {

    const savedTheme =
      localStorage.getItem(
        "theme"
      );

    if (
      savedTheme === "light"
    ) {

      document.body.classList.add(
        "light"
      );
    }

  }, []);

  // ==========================
  // DARK MODE / LIGHT MODE
  // ==========================

  const toggleTheme = () => {

    document.body.classList.toggle(
      "light"
    );

    const isLight =
      document.body.classList.contains(
        "light"
      );

    localStorage.setItem(

      "theme",

      isLight
      ? "light"
      : "dark"
    );
  };

  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {

    window.location.href =
      "/";
  };

  return (

    <div className="header">

      {/* LEFT */}

      <div className="headerWrapper">

        <div className="logo">
          💰 Finance Tracker
        </div>

      </div>

      {/* RIGHT */}

      <div className="nav">

        <span
          style={{
            cursor:"pointer"
          }}

          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </span>

        <span
          style={{
            cursor:"pointer"
          }}

          onClick={() =>
            navigate("/transactions")
          }
        >
          Transactions
        </span>

        {/* DARK MODE BUTTON */}

        <button
          className="themeBtn"
          onClick={toggleTheme}
        >

          {
            document.body.classList.contains(
              "light"
            )

            ? <FaMoon />

            : <FaSun />
          }

        </button>

        {/* LOGOUT BUTTON */}

        <button

          onClick={handleLogout}

          style={{

            padding:"10px 16px",

            border:"none",

            borderRadius:"12px",

            background:"#ef4444",

            color:"white",

            cursor:"pointer",

            fontWeight:"bold",

            fontSize:"13px"
          }}
        >

          Logout

        </button>

      </div>

    </div>
  );
}

export default Header;