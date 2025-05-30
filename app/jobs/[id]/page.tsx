import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobById, getCompanyById } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import JobApplicationForm from '@/components/jobs/job-application-form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  CheckCircle, 
  ArrowLeft, 
  Share2, 
  Heart, 
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((job) => ({
    id: job.id.toString()
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = getJobById(params.id);
  
  if (!job) {
    return {
      title: 'Job Not Found | JobBoard',
    };
  }
  
  return {
    title: `${job.title} at ${job.company} | JobBoard`,
    description: job.description,
  };
}

export default function JobDetailPage({ params }: Props) {
  const job = getJobById(Number(params.id));
  
  if (!job) {
    return notFound();
  }

  const company = getCompanyById(job.companyId);
  const timeAgo = formatDistanceToNow(job.postedAt, { addSuffix: true });

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        {/* Job Header */}
        <section className="bg-muted/50 py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Link href="/jobs" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to Jobs</span>
              </Link>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start">
                <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-8">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {job.logo && (
                      <img 
                        src={job.logo} 
                        alt={`${company?.name || 'Company'} logo`} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold">
                        {job.title}
                      </h1>
                      <p className="text-lg text-muted-foreground mt-1">
                        {company?.name}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
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
                          <span>Posted {timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
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
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      <p>{job.description}</p>
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-8 mb-4">Requirements</h3>
                    <div className="space-y-2">
                      {job.requirements.split('\n').map((requirement, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>{requirement}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-8 mb-4">Benefits</h3>
                    <div className="space-y-2">
                      {job.benefits.split('\n').map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About the Company</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded overflow-hidden mr-3 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          {job.logo && (
                            <img 
                              src={job.logo} 
                              alt={`${company?.name || 'Company'} logo`} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{company?.name}</h3>
                          {company?.website && (
                            <a 
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-muted-foreground hover:text-primary flex items-center mt-1"
                            >
                              <span>Visit website</span>
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {company?.description || `A leading company in the ${job.category} industry.`}
                      </p>
                    </CardContent>
                  </Card>

                  <JobApplicationForm jobId={job.id} jobTitle={job.title} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}