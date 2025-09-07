import { defineConfig } from "drizzle-kit";
import { resolve, dirname } from "node:path";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";

const dirname__ = dirname(fileURLToPath(import.meta.url));

dotenv.config({ quiet: true });

export default defineConfig({
    dialect: "postgresql",
    schema: resolve(dirname__, "./src/infrastructure/persistence/schema/*.js"),
    out: resolve(dirname__, "./src/infrastructure/persistence/migrations"),
    dbCredentials: {
        url: process.env.DATABASE_URL 
    }
});
