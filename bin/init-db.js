#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";

const dirname__ = dirname(fileURLToPath(import.meta.url));

dotenv.config({
    path: join(process.cwd(), ".env"),
    quiet: true
});

if (existsSync(join(process.cwd(), process.env.DATA_SOURCE))) process.exit(0);

const drizzleConfigPath = resolve(dirname__, "../drizzle.config.js"); 

try {
    execSync(`npx drizzle-kit generate --name=init --config=${drizzleConfigPath}`, { stdio: "inherit" });
    execSync(`npx drizzle-kit push --config=${drizzleConfigPath}`, { stdio: "inherit" });
} catch (error) { process.exit(1); }
