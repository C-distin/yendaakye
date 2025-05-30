import { z } from 'zod';

export interface Job {
  id: number;
  title: string;
  companyId: number;
  logo: string | null;
  location: string;
  salary: string | null;
  type: string;
  category: string;
  description: string;
  requirements: string;
  benefits: string;
  postedAt: Date;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: number;
  name: string;
  logo: string | null;
  description: string | null;
  founded: string | null;
  location: string | null;
  employees: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type JobFilters = {
  type?: string;
  category?: string;
  location?: string;
  search?: string;
};

export const companySchema = z.object({
  name: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  logo: z.string().url({ message: 'Please enter a valid logo URL' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  founded: z.string().min(4, { message: 'Please enter a valid founding year' }),
  location: z.string().min(2, { message: 'Location must be at least 2 characters' }),
  employees: z.string().min(1, { message: 'Please enter number of employees' }),
  website: z.string().url({ message: 'Please enter a valid website URL' }),
});

export type CompanyFormValues = z.infer<typeof companySchema>;