import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Check if we're running in production
const isProduction = process.env.NODE_ENV === 'production'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const connectionString = process.env.DATABASE_URL

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, {
  prepare: false,
  ssl: isProduction, // Enable SSL in production
  max: 20, // Maximum number of connections
})

export const db = drizzle(client); 