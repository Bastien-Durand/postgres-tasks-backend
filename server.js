import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); //req.body

// Routes

// Create a todo

app.post("/createtodo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// Get all todo

// Get a todo

// Update a todo

// Delete a todo

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
