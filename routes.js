// src/routes.js
const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/checkboxes", async (req, res) => {
  try {
    const result = await db.query("SELECT state FROM checkboxes WHERE id = 1");
    res.json(result.rows[0].state);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/checkboxes", async (req, res) => {
  const { index, value } = req.body;
  try {
    const result = await db.query("SELECT state FROM checkboxes WHERE id = 1");
    const state = result.rows[0].state;
    state[index] = value;
    await db.query("UPDATE checkboxes SET state = $1 WHERE id = 1", [state]);
    res.status(200).send("Updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
