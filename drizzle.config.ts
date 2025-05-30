import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({
  path: ".env.local", // Ensures .env.local is loaded
})

if (!process.env.DATABASE_URL) {
  console.error("🔴 DATABASE_URL environment variable is not set")
  console.log("Please add DATABASE_URL to your environment variables")
  process.exit(1)
}

console.log("🟢 DATABASE_URL found for Drizzle migrations")

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})
