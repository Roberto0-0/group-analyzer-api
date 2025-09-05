import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema/index.js";
import { join } from "node:path";
(await import("dotenv")).config({
    path: join(process.cwd(), ".env"),
    quiet: true
});

const sqlite = new Database(join(process.cwd(), process.env.DATA_SOURCE));
export const db = drizzle(sqlite, { schema });
