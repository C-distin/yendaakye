import { db } from './index';
import { jobs, companies, type Job, type Company, type NewJob, type NewCompany } from './schema';
import { eq } from 'drizzle-orm';

// Company queries
export async function getCompanies() {
  return await db.select().from(companies);
}

export async function getCompanyById(id: number) {
  const results = await db
    .select()
    .from(companies)
    .where(eq(companies.id, id));
  return results[0];
}

export async function createCompany(company: NewCompany) {
  const results = await db.insert(companies).values(company).returning();
  return results[0];
}

export async function updateCompany(id: number, company: Partial<NewCompany>) {
  const results = await db
    .update(companies)
    .set(company)
    .where(eq(companies.id, id))
    .returning();
  return results[0];
}

export async function deleteCompany(id: number) {
  const results = await db
    .delete(companies)
    .where(eq(companies.id, id))
    .returning();
  return results[0];
}

// Job queries
export async function getJobs() {
  return await db
    .select({
      ...jobs,
      company: companies
    })
    .from(jobs)
    .leftJoin(companies, eq(jobs.companyId, companies.id));
}

export async function getJobById(id: number) {
  const results = await db
    .select({
      ...jobs,
      company: companies
    })
    .from(jobs)
    .leftJoin(companies, eq(jobs.companyId, companies.id))
    .where(eq(jobs.id, id));
  return results[0];
}

export async function createJob(job: NewJob) {
  const results = await db.insert(jobs).values(job).returning();
  return results[0];
}

export async function updateJob(id: number, job: Partial<NewJob>) {
  const results = await db
    .update(jobs)
    .set(job)
    .where(eq(jobs.id, id))
    .returning();
  return results[0];
}

export async function deleteJob(id: number) {
  const results = await db
    .delete(jobs)
    .where(eq(jobs.id, id))
    .returning();
  return results[0];
} 