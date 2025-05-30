import { z } from 'zod';
import { pgTable, serial, text, timestamp, varchar, integer, boolean } from 'drizzle-orm/pg-core';

// Zod Schemas (existing)
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const jobApplicationSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  coverLetter: z.string().min(50, { message: 'Cover letter must be at least 50 characters' }),
  resume: z.any().optional(),
});

export type JobApplicationValues = z.infer<typeof jobApplicationSchema>;

export const jobFilterSchema = z.object({
  type: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  search: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

// Updated Company Schema to match Drizzle structure
export const companySchema = z.object({
  id: z.number().optional(), // Optional for creation
  name: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  logo: z.string().url({ message: 'Please enter a valid logo URL' }).optional().nullable(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }).optional().nullable(),
  founded: z.string().min(4, { message: 'Please enter a valid founding year' }).optional().nullable(),
  location: z.string().min(2, { message: 'Location must be at least 2 characters' }).optional().nullable(),
  employees: z.string().min(1, { message: 'Please enter number of employees' }).optional().nullable(),
  website: z.string().url({ message: 'Please enter a valid website URL' }).optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;

// Updated Job Schema to match Drizzle structure
export const jobSchema = z.object({
  id: z.number().optional(), // Optional for creation
  title: z.string().min(5, { message: 'Job title must be at least 5 characters' }),
  companyId: z.number(),
  logo: z.string().url({ message: 'Please enter a valid logo URL' }).optional().nullable(),
  location: z.string().min(2, { message: 'Location must be at least 2 characters' }),
  salary: z.string().min(1, { message: 'Please enter a salary range' }).optional().nullable(),
  type: z.string().min(1, { message: 'Please select a job type' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  description: z.string().min(50, { message: 'Description must be at least 50 characters' }),
  requirements: z.string().min(10, { message: 'Requirements must be at least 10 characters' }),
  benefits: z.string().min(10, { message: 'Benefits must be at least 10 characters' }),
  postedAt: z.date().optional(),
  featured: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type JobFormValues = z.infer<typeof jobSchema>;

// Drizzle ORM Schemas
export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  logo: text('logo'),
  description: text('description'),
  founded: varchar('founded', { length: 50 }), // Adjusted length
  location: varchar('location', { length: 256 }),
  employees: varchar('employees', { length: 50 }), // Adjusted length
  website: varchar('website', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  companyId: integer('company_id').references(() => companies.id).notNull(),
  logo: text('logo'), // Company logo can be denormalized here or joined
  location: varchar('location', { length: 256 }).notNull(),
  salary: varchar('salary', { length: 100 }),
  type: varchar('type', { length: 50 }).notNull(), // Full-time, Part-time etc.
  category: varchar('category', { length: 100 }).notNull(),
  description: text('description').notNull(),
  requirements: text('requirements').notNull(), // Storing as text, can be JSON/JSONB for structured data
  benefits: text('benefits').notNull(), // Storing as text, can be JSON/JSONB for structured data
  postedAt: timestamp('posted_at').defaultNow().notNull(),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Infer types for Drizzle (optional but good practice)
export type Company = typeof companies.$inferSelect; // for select
export type NewCompany = typeof companies.$inferInsert; // for insert

export type Job = typeof jobs.$inferSelect; // for select
export type NewJob = typeof jobs.$inferInsert; // for insert