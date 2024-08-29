import express from "express";
import cors from "cors";
import  {db}  from "./database/connection.database.js";

const app = express();

const corsOptions = {
  origin: "https://naturaldreams.netlify.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/testdb", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT NOW()");
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
