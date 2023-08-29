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
    console.error(error.message);
  }
});

// Get all todo

app.get("/alltodo", async (req, res) => {
  try {
    const getAllTodo = await pool.query("SELECT * FROM todo");
    res.send(getAllTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todoId = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [
      id,
    ]);
    if (todoId.rows < 1) {
      res.send(`Todo with id: '${id}' not found`);
    } else {
      res.send(todoId.rows);
    }
  } catch (error) {
    console.error(error.message);
  }
});

// Update a todo

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updatedDescription = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a todo

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteById = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Item deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
