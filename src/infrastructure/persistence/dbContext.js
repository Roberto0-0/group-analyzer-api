import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/index.js";
(await import("dotenv")).config({ quiet: true });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const db = drizzle(pool, { schema });
