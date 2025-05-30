import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Job } from '@/lib/types';
import { Clock, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { getCompanyById } from '@/lib/data';

interface JobCardProps {
  job: Job;
  variant?: 'default' | 'featured';
  className?: string;
}

const JobCard = ({ job, variant = 'default', className }: JobCardProps) => {
  const company = getCompanyById(job.companyId);
  const timeAgo = formatDistanceToNow(job.postedAt, { addSuffix: true });

  return (
    <Link href={`/jobs/${job.id}`}>
      <div 
        className={cn(
          'group bg-card rounded-lg border border-border p-6 transition-all duration-300 hover:shadow-md',
          variant === 'featured' && 'border-l-4 border-l-primary',
          className
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Logo */}
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {job.logo && (
                <img 
                  src={job.logo} 
                  alt={`${company?.name || 'Company'} logo`} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {company?.name}
                </p>

                {/* Job details */}
                <div className="flex flex-wrap gap-3 mt-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{job.type}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
                <Badge variant="secondary">{job.category}</Badge>
                {job.featured && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;