import { defineConfig } from "drizzle-kit";
import { join } from "node:path";
import * as dotenv from "dotenv";

dotenv.config({
    path: join(process.cwd(), ".env"),
    quiet: true
});

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/infrastructure/persistence/schema/*.js",
    out: "./src/infrastructure/persistence/drizzle",
    dbCredentials: {
        url: process.env.DATA_SOURCE_DEV
    }
});
