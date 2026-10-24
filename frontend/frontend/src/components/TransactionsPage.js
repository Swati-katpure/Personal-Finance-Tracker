import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function TransactionsPage({ transactions }) {

  const navigate = useNavigate();

  return (

    <div className="dashboard">

      {/* HEADER */}

      <div className="header">

        <div className="logo">
          💰 Finance Tracker
        </div>

        <button
          className="themeBtn"
          onClick={() => navigate("/dashboard")}
        >
          ⬅
        </button>

      </div>

      {/* TITLE */}

      <h1 className="title">
        📜 Transaction History
      </h1>

      {/* TRANSACTIONS */}

      <div
        className="section"
        style={{
          height: "80vh",
          overflowY: "auto"
        }}
      >

        {
          transactions.length === 0 ? (

            <h3
              style={{
                textAlign: "center",
                color: "#cbd5e1"
              }}
            >
              No Transactions Found
            </h3>

          ) : (

            transactions.map((t, i) => (

              <div
                className="transaction"
                key={i}
              >

                <div>

                  <h3>
                    {t.category}
                  </h3>

                  <p>
                    {t.date}
                  </p>

                </div>

                <div
                  className="amountText"
                >

                  ₹ {Number(t.amount).toFixed(2)}

                </div>

              </div>
            ))
          )
        }

      </div>

    </div>
  );
}

export default TransactionsPage;