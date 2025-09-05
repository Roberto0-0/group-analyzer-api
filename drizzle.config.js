import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/infrastructure/persistence/schema/*.js",
    out: "./src/infrastructure/persistence/drizzle",
    dbCredentials: {
        url: process.env.DATA_SOURCE
    }
});
