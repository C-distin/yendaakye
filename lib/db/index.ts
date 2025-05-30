import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Check if the DATABASE_URL environment variable exists
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a new PostgreSQL client
const client = postgres(process.env.DATABASE_URL, { prepare: false });

// Create a Drizzle instance with the client and schema
export const db = drizzle(client, { schema });

// Export the client to be able to end it when needed
export { client }; 