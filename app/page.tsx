import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FeaturedJobs from '@/components/jobs/featured-jobs';
import JobCard from '@/components/jobs/job-card';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getFeaturedJobs, getLatestJobs, getCategories } from '@/lib/data';
import { ArrowRight, BriefcaseBusiness, Users, Award, TrendingUp } from 'lucide-react';

export default function Home() {
  const featuredJobs = getFeaturedJobs(4);
  const latestJobs = getLatestJobs(3);
  const categories = getCategories();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-muted/60 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  Find Your <span className="text-primary">Dream Job</span> With Us
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Connecting talented professionals with top companies. Explore thousands of job opportunities across various industries.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/jobs">
                    <Button size="lg" className="w-full sm:w-auto">
                      Browse Jobs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      For Employers
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Professional team working together"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="bg-card rounded-lg p-6 border border-border text-center">
                <BriefcaseBusiness className="mx-auto h-8 w-8 text-primary mb-3" />
                <div className="text-2xl md:text-3xl font-bold">2,500+</div>
                <p className="text-muted-foreground mt-1">Active Jobs</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border text-center">
                <Users className="mx-auto h-8 w-8 text-primary mb-3" />
                <div className="text-2xl md:text-3xl font-bold">1M+</div>
                <p className="text-muted-foreground mt-1">Job Seekers</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border text-center">
                <Award className="mx-auto h-8 w-8 text-primary mb-3" />
                <div className="text-2xl md:text-3xl font-bold">500+</div>
                <p className="text-muted-foreground mt-1">Top Companies</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-primary mb-3" />
                <div className="text-2xl md:text-3xl font-bold">98%</div>
                <p className="text-muted-foreground mt-1">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <FeaturedJobs jobs={featuredJobs} />

        {/* Latest Jobs Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Latest Jobs</h2>
                <p className="mt-2 text-muted-foreground">
                  Recently added opportunities
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link href="/jobs">
                  <Button variant="outline" className="group">
                    <span>View All Jobs</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {latestJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Popular Categories</h2>
              <p className="mt-2 text-muted-foreground">
                Explore jobs by category
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category} 
                  href={`/jobs?category=${category}`}
                  className="group bg-card hover:bg-primary/5 rounded-lg border border-border p-6 transition-colors"
                >
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 50) + 10} open positions
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold">Ready to find your next opportunity?</h2>
              <p className="mt-4 text-lg opacity-90">
                Join thousands of job seekers who have found their dream jobs through our platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/jobs">
                  <Button size="lg" variant="secondary">
                    Find Jobs
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                    Post a Job
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}