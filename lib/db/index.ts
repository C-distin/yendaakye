import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Check if the DATABASE_URL environment variable exists
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a Drizzle instance with the pool and schema
export const db = drizzle(pool, { schema });

// Export the pool to be able to end it when needed
export { pool }; 