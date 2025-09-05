#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import * as dotenv from "dotenv";

dotenv.config({
    path: join(process.cwd(), ".env"),
    quiet: true
});

if (existsSync(join(process.cwd(), process.env.DATA_SOURCE))) process.exit(0);

try {
    execSync("npx drizzle-kit generate --name=init", { stdio: "inherit" });
    execSync("npx drizzle-kit push", { stdio: "inherit" });
} catch (error) { process.exit(1); }
