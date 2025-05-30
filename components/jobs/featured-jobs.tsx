import { Job } from '@/lib/types';
import JobCard from './job-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface FeaturedJobsProps {
  jobs: Job[];
  title?: string;
  showViewAll?: boolean;
}

const FeaturedJobs = ({ 
  jobs, 
  title = "Featured Jobs", 
  showViewAll = true 
}: FeaturedJobsProps) => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <p className="mt-2 text-muted-foreground">
              Explore top opportunities from leading companies
            </p>
          </div>
          
          {showViewAll && (
            <div className="mt-4 md:mt-0">
              <Link href="/jobs">
                <Button variant="outline" className="group">
                  <span>View All Jobs</span>
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              variant="featured"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;