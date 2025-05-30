import { Suspense } from 'react';
import { Metadata } from 'next';
import { filterJobs, getCategories, getJobTypes, getLocations } from '@/lib/data';
import { JobFilters } from '@/lib/types';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import JobCard from '@/components/jobs/job-card';
import JobFilter from '@/components/jobs/job-filter';
import { Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Jobs | JobBoard',
  description: 'Find your dream job from thousands of listings',
};

export default function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Parse search parameters
  const filters: JobFilters = {
    search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    location: typeof searchParams.location === 'string' ? searchParams.location : undefined,
    type: typeof searchParams.type === 'string' ? searchParams.type : undefined,
  };

  // Get filtered jobs and filter options
  const jobs = filterJobs(filters);
  const categories = getCategories();
  const locations = getLocations();
  const jobTypes = getJobTypes();

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        {/* Page Header */}
        <section className="bg-muted/50 py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Browse Jobs
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Find your dream job from our curated list of opportunities
              </p>
            </div>

            {/* Job Search Form */}
            <div className="mt-8 bg-card rounded-lg border border-border p-6">
              <JobFilter 
                categories={categories}
                locations={locations}
                jobTypes={jobTypes}
                initialValues={filters}
              />
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
                {filters.search && <span> for "{filters.search}"</span>}
                {filters.category && <span> in {filters.category}</span>}
                {filters.location && <span> in {filters.location}</span>}
                {filters.type && <span> ({filters.type})</span>}
              </h2>
            </div>

            <Suspense fallback={<div className="py-10 text-center">Loading jobs...</div>}>
              {jobs.length > 0 ? (
                <div className="space-y-6">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">No jobs found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search filters to find more opportunities.
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}