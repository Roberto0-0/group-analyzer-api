import { defineConfig } from "drizzle-kit";
import { join, resolve, dirname } from "node:path";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";

const dirname__ = dirname(fileURLToPath(import.meta.url));

dotenv.config({
    path: join(process.cwd(), ".env"),
    quiet: true
});

export default defineConfig({
    dialect: "sqlite",
    schema: resolve(dirname__, "./src/infrastructure/persistence/schema/*.js"),
    out: resolve(dirname__, "./src/infrastructure/persistence/migrations"),
    dbCredentials: {
        url: join(process.cwd(), process.env.DATA_SOURCE)
    }
});
