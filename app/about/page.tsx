import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Globe, 
  Award, 
  Briefcase, 
  CheckCircle, 
  Clock,
  BarChart
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Yendaakye',
  description: 'Learn about JobBoard and our mission to connect talent with opportunity',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  Our Mission is to Connect <span className="text-primary">Talent</span> with <span className="text-primary">Opportunity</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  At Yendaakye Job Center, we're passionate about connecting talented people with meaningful opportunities. Our mission is to make the job search process as easy and efficient as possible for everyone.
                  Founded in 2020, Yendaakye Job Center has quickly become a leading platform for job seekers and employers. We're dedicated to making the job search process smoother, faster, and more efficient for everyone involved.
                </p>
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Our team collaborating"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold">Our Values</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The core principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-8 border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">People First</h3>
                <p className="text-muted-foreground">
                  We believe in putting people at the center of everything we do, creating experiences that prioritize human needs.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in every aspect of our service, constantly improving and refining our platform.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We're committed to creating a platform that is accessible and welcoming to people from all backgrounds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold">1M+</div>
                <p className="mt-2 opacity-90">Job Seekers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">10K+</div>
                <p className="mt-2 opacity-90">Companies</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">50K+</div>
                <p className="mt-2 opacity-90">Jobs Posted</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">100+</div>
                <p className="mt-2 opacity-90">Industries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold">Our Team</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Meet the passionate people behind JobBoard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card rounded-lg overflow-hidden border border-border">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Team member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Sarah Johnson</h3>
                  <p className="text-muted-foreground">CEO & Founder</p>
                </div>
              </div>

              <div className="bg-card rounded-lg overflow-hidden border border-border">
                <img 
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Team member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Michael Chen</h3>
                  <p className="text-muted-foreground">CTO</p>
                </div>
              </div>

              <div className="bg-card rounded-lg overflow-hidden border border-border">
                <img 
                  src="https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Team member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Emily Rodriguez</h3>
                  <p className="text-muted-foreground">Head of Operations</p>
                </div>
              </div>

              <div className="bg-card rounded-lg overflow-hidden border border-border">
                <img 
                  src="https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Team member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">David Smith</h3>
                  <p className="text-muted-foreground">Marketing Director</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold">Why Choose Yendaakye Job Center</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                What sets us apart from other job platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-8 border border-border">
                <Briefcase className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Quality Job Listings</h3>
                <p className="text-muted-foreground">
                  We carefully review all job postings to ensure they meet our standards for quality and legitimacy.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 border border-border">
                <Clock className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Time-Saving Tools</h3>
                <p className="text-muted-foreground">
                  Our advanced search and filtering options help you find relevant opportunities quickly.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 border border-border">
                <BarChart className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Data-Driven Matches</h3>
                <p className="text-muted-foreground">
                  We use smart algorithms to connect candidates with the jobs that best match their skills and preferences.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 border border-border">
                <Globe className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
                <p className="text-muted-foreground">
                  Access opportunities from companies around the world, whether you're looking for remote work or local jobs.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 border border-border">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Our team is here to help both job seekers and employers throughout the entire process.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 border border-border">
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Verified Companies</h3>
                <p className="text-muted-foreground">
                  We verify employers to ensure you're applying to legitimate opportunities with reputable organizations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-lg border border-border p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Ready to find your perfect match?</h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Whether you're looking for your next career move or searching for top talent, we're here to help.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                  <Link href="/jobs">
                    <Button size="lg" className="w-full sm:w-auto">
                      Browse Jobs
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Contact Us
                    </Button>
                  </Link>
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