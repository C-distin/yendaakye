import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env.local');
}

const client = postgres(process.env.DATABASE_URL, {
  prepare: false,
  ssl: 'require'
});

export const db = drizzle(client);
