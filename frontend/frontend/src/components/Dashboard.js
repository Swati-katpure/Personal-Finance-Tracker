import React, { useState } from "react";
import Header from "./Header";

import "../App.css";

import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js";

import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { FaSearch } from "react-icons/fa";

import jsPDF from "jspdf";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

pdfjsLib.GlobalWorkerOptions.workerSrc =
  pdfWorker;

function Dashboard({
  transactions,
  setTransactions
}) {

  // ==========================
  // STATES
  // ==========================

  const [amount,
    setAmount] =
    useState("");

  const [category,
    setCategory] =
    useState("Food");

  const [type,
    setType] =
    useState("expense");

  const [search,
    setSearch] =
    useState("");

  const [budget,
    setBudget] =
    useState("");

  const [editIndex,
    setEditIndex] =
    useState(null);

  // ==========================
  // ADD / EDIT TRANSACTION
  // ==========================

  const addTransaction = () => {

    if (!amount) return;

    const newTransaction = {

      amount:
        Number(amount),

      category,

      type,

      date:
        new Date()
          .toLocaleString()
    };

    // EDIT

    if (
      editIndex !== null
    ) {

      const updated =
        [...transactions];

      updated[
        editIndex
      ] = newTransaction;

      setTransactions(
        updated
      );

      setEditIndex(null);
    }

    // ADD

    else {

      setTransactions([

        ...transactions,

        newTransaction
      ]);
    }

    setAmount("");
  };

  // ==========================
  // EDIT TRANSACTION
  // ==========================

  const editTransaction =
    (index) => {

      const transaction =
        transactions[index];

      setAmount(
        transaction.amount
      );

      setCategory(
        transaction.category
      );

      setType(
        transaction.type
      );

      setEditIndex(index);
    };

  // ==========================
  // DELETE TRANSACTION
  // ==========================

  const deleteTransaction =
    (index) => {

      const updated =
        transactions.filter(
          (_, i) => i !== index
        );

      setTransactions(updated);
    };

  // ==========================
  // TOTALS
  // ==========================

  const income =
    transactions
      .filter(
        (t) =>
          t.type === "income"
      )
      .reduce(
        (a, b) =>
          a + b.amount,
        0
      );

  const expense =
    transactions
      .filter(
        (t) =>
          t.type === "expense"
      )
      .reduce(
        (a, b) =>
          a + b.amount,
        0
      );

  const balance =
    income - expense;

  // ==========================
  // BUDGET ALERT
  // ==========================

  const budgetExceeded =

    budget &&
    expense > Number(budget);

  // ==========================
  // SEARCH FILTER
  // ==========================

  const filteredTransactions =
    transactions.filter((t) =>

      t.category
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ==========================
  // PIE CHART DATA
  // ==========================

  const chartData = {

    labels:
      transactions.map(
        (t) => t.category
      ),

    datasets: [

      {

        label: "Expenses",

        data:
          transactions.map(
            (t) => t.amount
          ),

        backgroundColor: [

          "#38bdf8",

          "#22c55e",

          "#f59e0b",

          "#ef4444",

          "#8b5cf6",

          "#14b8a6"
        ]
      }
    ]
  };

  // ==========================
  // CATEGORY DETECTION
  // ==========================

  const detectCategory =
    (text) => {

      text =
        text.toLowerCase();

      if (
        text.includes("swiggy") ||
        text.includes("zomato")
      ) {
        return "Food";
      }

      if (
        text.includes("uber") ||
        text.includes("ola") ||
        text.includes("rapido")
      ) {
        return "Travel";
      }

      if (
        text.includes("amazon") ||
        text.includes("flipkart") ||
        text.includes("myntra")
      ) {
        return "Shopping";
      }

      if (
        text.includes("jio") ||
        text.includes("airtel") ||
        text.includes("recharge")
      ) {
        return "Mobile Recharge";
      }

      if (
        text.includes("bill") ||
        text.includes("electricity")
      ) {
        return "Bill";
      }

      return "Other";
    };

  // ==========================
  // PDF UPLOAD
  // ==========================

  const handleFileUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onload =
        async function () {

          try {

            const typedArray =
              new Uint8Array(
                reader.result
              );

            const pdf =
              await pdfjsLib
                .getDocument({
                  data:
                    typedArray
                }).promise;

            let fullText = "";

            for (
              let i = 1;
              i <= pdf.numPages;
              i++
            ) {

              const page =
                await pdf.getPage(i);

              const textContent =
                await page.getTextContent();

              const text =
                textContent.items
                  .map(
                    item => item.str
                  )
                  .join(" ");

              fullText +=
                text + "\n";
            }

            const lines =
              fullText.split("\n");

            let categoryTotals = {

              Food: 0,

              Travel: 0,

              Shopping: 0,

              "Mobile Recharge": 0,

              Bill: 0,

              Other: 0
            };

            lines.forEach((line) => {

              const category =
                detectCategory(
                  line
                );

              const amounts =
                line.match(
                  /\b\d{2,5}(?:\.\d{1,2})?\b/g
                );

              if (amounts) {

                const lastAmount =
                  Number(
                    amounts[
                      amounts.length - 1
                    ]
                  );

                if (
                  lastAmount >= 10 &&
                  lastAmount <= 100000
                ) {

                  categoryTotals[
                    category
                  ] += lastAmount;
                }
              }
            });

            let finalTransactions =
              [];

            Object.keys(
              categoryTotals
            ).forEach((cat) => {

              if (
                categoryTotals[
                  cat
                ] > 0
              ) {

                finalTransactions.push({

                  category: cat,

                  amount:
                    categoryTotals[
                      cat
                    ],

                  type:
                    "expense",

                  date:
                    new Date()
                      .toLocaleString()
                });
              }
            });

            setTransactions([
              ...transactions,
              ...finalTransactions
            ]);

            alert(
              "PDF Parsed Successfully"
            );

          } catch (error) {

            console.log(error);

            alert(
              "Error Reading PDF"
            );
          }
        };

      reader.readAsArrayBuffer(file);
    };

  // ==========================
  // DOWNLOAD PDF REPORT
  // ==========================

  const downloadReport = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "Personal Finance Report",
      20,
      20
    );

    doc.setFontSize(13);

    doc.text(
      `Total Income : Rs ${income.toFixed(2)}`,
      20,
      40
    );

    doc.text(
      `Total Expense : Rs ${expense.toFixed(2)}`,
      20,
      50
    );

    doc.text(
      `Current Balance : Rs ${balance.toFixed(2)}`,
      20,
      60
    );

    doc.line(20, 70, 190, 70);

    doc.setFontSize(16);

    doc.text(
      "Transactions History",
      20,
      82
    );

    let y = 95;

    doc.setFillColor(56,189,248);

    doc.rect(10, y - 7, 190, 10, "F");

    doc.setTextColor(255,255,255);

    doc.setFontSize(11);

    doc.text("No", 15, y);

    doc.text("Category", 30, y);

    doc.text("Type", 80, y);

    doc.text("Amount", 115, y);

    doc.text("Date & Time", 145, y);

    y += 12;

    doc.setTextColor(0,0,0);

    transactions.forEach((t, index) => {

      if (y > 270) {

        doc.addPage();

        y = 20;
      }

      doc.setFillColor(245,245,245);

      doc.rect(10, y - 6, 190, 10, "F");

      doc.text(
        String(index + 1),
        15,
        y
      );

      doc.text(
        String(t.category),
        30,
        y
      );

      doc.text(
        String(t.type),
        80,
        y
      );

      doc.text(
        `Rs ${Number(t.amount).toFixed(2)}`,
        115,
        y
      );

      doc.text(
        String(t.date),
        145,
        y
      );

      y += 12;
    });

    doc.save(
      "Finance_Report.pdf"
    );
  };

  // ==========================
  // UI
  // ==========================

  return (

    <div className="dashboard">

      <Header />

      <h1 className="title">
        💰 Personal Finance Tracker
      </h1>

      {/* TOP CARDS */}

      <div className="topCards">

        <div className="card">

          <h2>Income</h2>

          <h1>
            ₹ {income.toFixed(2)}
          </h1>

        </div>

        <div className="card">

          <h2>Expense</h2>

          <h1>
            ₹ {expense.toFixed(2)}
          </h1>

        </div>

        <div className="card">

          <h2>Balance</h2>

          <h1>
            ₹ {balance.toFixed(2)}
          </h1>

        </div>

      </div>

      {/* MAIN */}

      <div className="mainSections">

        {/* COLUMN 1 */}

        <div className="section">

          <h2>
            ✍ Manual Entry
          </h2>

          <input
            type="number"
            placeholder="Set Monthly Budget"

            value={budget}

            onChange={(e) =>
              setBudget(
                e.target.value
              )
            }
          />

          {

            budgetExceeded && (

              <div
                style={{

                  background:"#ef4444",

                  padding:"10px",

                  borderRadius:"10px",

                  marginTop:"10px",

                  marginBottom:"10px",

                  textAlign:"center",

                  fontWeight:"bold"
                }}
              >

                ⚠ Budget Exceeded

              </div>
            )
          }

          <div className="formBox">

            <select
              value={type}
              onChange={(e) => {

                setType(
                  e.target.value
                );

                if (
                  e.target.value ===
                  "income"
                ) {
                  setCategory(
                    "Salary"
                  );
                }

                else {

                  setCategory(
                    "Food"
                  );
                }
              }}
            >

              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>

            </select>

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >

              {type === "income" && (

                <>

                  <option value="Salary">
                    Salary
                  </option>

                  <option value="Business">
                    Business
                  </option>

                </>
              )}

              {type === "expense" && (

                <>

                  <option value="Food">
                    Food
                  </option>

                  <option value="Travel">
                    Travel
                  </option>

                  <option value="Shopping">
                    Shopping
                  </option>

                  <option value="Bill">
                    Bill
                  </option>

                  <option value="Mobile Recharge">
                    Mobile Recharge
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </>
              )}

            </select>

            <input
              type="number"
              placeholder="Enter Amount"

              value={amount}

              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
            />

            <button
              onClick={
                addTransaction
              }
            >

              {
                editIndex !== null
                ? "Update Transaction"
                : "Add Transaction"
              }

            </button>

          </div>

        </div>

        {/* COLUMN 2 */}

        <div className="section">

          <h2>
            📄 PDF & Transactions
          </h2>

          <div className="searchBox">

            <FaSearch />

            <input
              type="text"

              placeholder="Search Category..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {/* FILE + DOWNLOAD BUTTON */}

          <div
            style={{

              display:"flex",

              alignItems:"center",

              gap:"10px",

              marginTop:"10px"
            }}
          >

            {/* FILE INPUT */}

            <div
              className="pdfBox"
              style={{

                flex:1,

                padding:"8px 10px"
              }}
            >

              <input
                type="file"

                onChange={
                  handleFileUpload
                }

                style={{

                  width:"100%",

                  color:"white",

                  fontSize:"13px"
                }}
              />

            </div>

            {/* DOWNLOAD BUTTON */}

            <button

              onClick={
                downloadReport
              }

              style={{

                width:"45px",

                height:"45px",

                minWidth:"45px",

                border:"none",

                borderRadius:"10px",

                background:
                "linear-gradient(135deg,#22c55e,#16a34a)",

                color:"white",

                cursor:"pointer",

                fontSize:"20px",

                display:"flex",

                alignItems:"center",

                justifyContent:"center",

                boxShadow:
                "0 4px 12px rgba(0,0,0,0.25)"
              }}
            >

              ⬇

            </button>

          </div>

          <div className="transactionBox">

            {
              filteredTransactions.map(
                (t, i) => (

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

                    <div className="transactionAmount">

                      <div className="amountText">

                        ₹ {
                          Number(
                            t.amount
                          ).toFixed(2)
                        }

                      </div>

                      <button
                        className="editBtn"

                        onClick={() =>
                          editTransaction(i)
                        }
                      >

                        Edit

                      </button>

                      <button
                        className="deleteBtn"

                        onClick={() =>
                          deleteTransaction(i)
                        }
                      >

                        Delete

                      </button>

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>

        {/* COLUMN 3 */}

        <div className="section">

          <h2>
            📊 Expense Analytics
          </h2>

          <div className="chartContainer">

            <Pie
              data={chartData}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;