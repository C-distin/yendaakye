import { Job, Company } from './types';

// Initialize companies with a Map for easier management
let companiesMap = new Map<number, Company>([
  [1, {
    id: 1,
    name: 'Acme Inc.',
    logo: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A global leader in innovation and technology solutions.',
    founded: '2005',
    location: 'San Francisco, CA',
    employees: '1000+',
    website: 'https://acme.example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  [2, {
    id: 2,
    name: 'TechHub',
    logo: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Revolutionizing the tech industry with cutting-edge products.',
    founded: '2012',
    location: 'Austin, TX',
    employees: '500+',
    website: 'https://techhub.example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  [3, {
    id: 3,
    name: 'FutureSoft',
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Creating solutions for tomorrow\'s challenges.',
    founded: '2018',
    location: 'Seattle, WA',
    employees: '250+',
    website: 'https://futuresoft.example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }]
]);

// Initialize jobs with a Map for easier management
let jobsMap = new Map<number, Job>([
  [1, {
    id: 1,
    title: 'Senior Frontend Developer',
    companyId: 1,
    logo: companiesMap.get(1)?.logo || null,
    location: 'San Francisco, CA (Remote)',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    category: 'Software Development',
    description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building high-quality user interfaces using React and TypeScript.',
    requirements: 'Experience with React, TypeScript, and modern web development practices. Strong understanding of web performance and optimization. Experience with responsive design and cross-browser compatibility.',
    benefits: 'Competitive salary and equity. Comprehensive health benefits. Flexible work hours. Remote work options. Professional development opportunities.',
    postedAt: new Date('2024-03-01'),
    featured: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  }],
  [2, {
    id: 2,
    title: 'Product Designer',
    companyId: 2,
    logo: companiesMap.get(2)?.logo || null,
    location: 'Austin, TX',
    salary: '$90,000 - $120,000',
    type: 'Full-time',
    category: 'Design',
    description: 'Join our design team to create beautiful and intuitive user experiences. You will work closely with product managers and engineers to bring designs to life.',
    requirements: 'Strong portfolio demonstrating UI/UX design skills. Proficiency in Figma and modern design tools. Experience with design systems and component libraries.',
    benefits: 'Health and dental coverage. Flexible vacation policy. Home office setup allowance. Regular team events and activities.',
    postedAt: new Date('2024-03-02'),
    featured: true,
    createdAt: new Date('2024-03-02'),
    updatedAt: new Date('2024-03-02')
  }]
]);

// Company management functions
export const getAllCompanies = (): Company[] => {
  return Array.from(companiesMap.values());
};

export const getCompanyById = (id: number): Company | undefined => {
  return companiesMap.get(id);
};

export const addCompany = (company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Company => {
  const id = Math.max(0, ...Array.from(companiesMap.keys())) + 1;
  const newCompany: Company = {
    ...company,
    id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  companiesMap.set(id, newCompany);
  return newCompany;
};

export const updateCompany = (id: number, company: Omit<Company, 'id' | 'createdAt'>): Company => {
  const existingCompany = companiesMap.get(id);
  if (!existingCompany) {
    throw new Error(`Company with id ${id} not found`);
  }

  const updatedCompany: Company = {
    ...company,
    id,
    createdAt: existingCompany.createdAt,
    updatedAt: new Date()
  };
  companiesMap.set(id, updatedCompany);
  return updatedCompany;
};

export const deleteCompany = (id: number): void => {
  companiesMap.delete(id);
};

// Job management functions
export const getAllJobs = (): Job[] => {
  return Array.from(jobsMap.values());
};

export const getJobById = (id: number): Job | undefined => {
  return jobsMap.get(id);
};

export const getFeaturedJobs = (limit: number = 4): Job[] => {
  return Array.from(jobsMap.values())
    .filter(job => job.featured)
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime())
    .slice(0, limit);
};

export const getLatestJobs = (limit: number = 6): Job[] => {
  return Array.from(jobsMap.values())
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime())
    .slice(0, limit);
};

export const deleteJob = (id: number): void => {
  jobsMap.delete(id);
};

export const updateJob = (id: number, job: Omit<Job, 'id' | 'createdAt'>): Job => {
  const existingJob = jobsMap.get(id);
  if (!existingJob) {
    throw new Error(`Job with id ${id} not found`);
  }

  const updatedJob: Job = {
    ...job,
    id,
    createdAt: existingJob.createdAt,
    updatedAt: new Date()
  };
  jobsMap.set(id, updatedJob);
  return updatedJob;
};

export const addJob = (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Job => {
  const id = Math.max(0, ...Array.from(jobsMap.keys())) + 1;
  const newJob: Job = {
    ...job,
    id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  jobsMap.set(id, newJob);
  return newJob;
};

export const filterJobs = (filters: { type?: string; category?: string; location?: string; search?: string }): Job[] => {
  return Array.from(jobsMap.values()).filter(job => {
    if (filters.type && job.type !== filters.type) {
      return false;
    }

    if (filters.category && job.category !== filters.category) {
      return false;
    }

    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const company = companiesMap.get(job.companyId);
      return (
        job.title.toLowerCase().includes(searchLower) ||
        (company?.name.toLowerCase().includes(searchLower) || false) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });
};

export const getCategories = (): string[] => {
  const categories = new Set(Array.from(jobsMap.values()).map(job => job.category));
  return Array.from(categories);
};

export const getLocations = (): string[] => {
  const locations = new Set(Array.from(jobsMap.values()).map(job => {
    const match = job.location.match(/^([^(]+)/);
    return match ? match[0].trim() : job.location;
  }));
  return Array.from(locations);
};

export const getJobTypes = (): string[] => [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship'
];