import { readFileSync, existsSync } from "fs";

export const CONFIG_FILE = "config.json";

export const config = existsSync(CONFIG_FILE) ? JSON.parse(readFileSync(CONFIG_FILE, "utf-8")) : {};
