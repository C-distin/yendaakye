import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Check if the DATABASE_URL environment variable exists
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set. Please add it to your environment variables.")
}

console.log("🟢 DATABASE_URL found, connecting to database...")

// Create a new PostgreSQL client
const client = postgres(process.env.DATABASE_URL, {
  prepare: false,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Create a Drizzle instance with the client and schema
export const db = drizzle(client, { schema })

// Export the client to be able to end it when needed
export { client }
