const express = require("express");

const router = express.Router();

const Transaction =
require("../models/Transaction");

router.get("/", async (req, res) => {

  const transactions =
  await Transaction.find();

  res.json(transactions);

});

router.post("/", async (req, res) => {

  const transaction =
  new Transaction(req.body);

  const savedTransaction =
  await transaction.save();

  res.json(savedTransaction);

});

router.delete("/:id",
async (req, res) => {

  await Transaction.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted"
  });

});

module.exports = router;