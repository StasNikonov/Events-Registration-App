import express from "express";
import pkg from "pg";
const { Pool } = pkg;
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.PORT || 8080;
const app = express();

const pool = new Pool({
  user: "postgres",
  password: "18252613Dd",
  host: "localhost",
  port: 5432,
  database: "node_postgres",
});

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("HELLO POSTGRES + NODEJS!!!!!");
});

app.post("/api/register", async (req, res) => {
  const { fullName, email, dob, heardFrom, eventId } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO participant (name, email, dob, info, event_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [fullName, email, dob, heardFrom, eventId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting participant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM event");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/participants/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM participant WHERE event_id = $1",
      [eventId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
