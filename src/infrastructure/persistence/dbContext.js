import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema/index.js";
(await import("dotenv")).config();

const sqlite = new Database(process.env.DATA_SOURCE);
export const db = drizzle(sqlite, { schema });
