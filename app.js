import express from "express";
import cors from "cors";
import { db } from "./database/connection.database.js";
import userRouter from "./routes/user.route.js";
import publicRouter from "./routes/public.route.js";
import adminRouter from "./routes/admin.route.js";

const app = express();

const corsOptions = {
  origin: ["https://naturaldreams.netlify.app", "http://localhost:5173"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", [userRouter, adminRouter]);
app.use("/", publicRouter);

//TEST DB CONNECTION
app.use("/testdb", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT NOW()");
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

//RESPONSE DEFAULT
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
