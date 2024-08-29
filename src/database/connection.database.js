import pg from "pg";
import { DB_URI } from "../config.js";

const { Pool } = pg;
const connectionString = DB_URI;

export const db = new Pool({
  allowExitOnIdle: true,
  connectionString,
});
