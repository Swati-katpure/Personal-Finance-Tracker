import React, {
  useState
} from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./components/Dashboard";

import TransactionsPage from "./components/TransactionsPage";

function App() {

  // GLOBAL TRANSACTIONS STATE

  const [transactions,
    setTransactions] =
    useState([]);

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* DASHBOARD */}

        <Route

          path="/dashboard"

          element={

            <Dashboard

              transactions={transactions}

              setTransactions={setTransactions}

            />
          }
        />

        {/* TRANSACTIONS PAGE */}

        <Route

          path="/transactions"

          element={

            <TransactionsPage

              transactions={transactions}

            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;