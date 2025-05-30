import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ContactForm from '@/components/contact/contact-form';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Yendaakye',
  description: 'Get in touch with the JobBoard team',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        {/* Page Header */}
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold">Get in Touch</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Have a question or need assistance? We're here to help! Fill out the form below or use our contact information.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="bg-card rounded-lg border border-border p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-3 mr-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Our Office</h3>
                        <p className="text-muted-foreground mt-1">
                          House No. C/403 Alhaji Sulley Road<br />
                          Abelenkpe, Accra
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-3 mr-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground mt-1">
                          <a 
                            href="mailto:Yendaakyejobscenter@proton.me "
                            className="hover:text-primary transition-colors"
                          >
                            Yendaakyejobscenter@proton.me 
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-3 mr-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground mt-1">
                          <a 
                            href="tel:0248884360"
                            className="hover:text-primary transition-colors"
                          >
                            0248884360
                          </a>
                        </p>
                        <p className="text-muted-foreground mt-1">
                          <a 
                            href="tel:0503336534"
                            className="hover:text-primary transition-colors"
                          >
                            0503336534
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-3 mr-4">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Support Hours</h3>
                        <p className="text-muted-foreground mt-1">
                          Monday - Friday: 9am - 5pm <br />
                          Saturday: 10am - 5pm <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map
                <div className="bg-card rounded-lg border border-border overflow-hidden h-80">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1382872918793!2d-122.41941482393309!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1712345678903!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Find answers to common questions about JobBoard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-medium mb-3">How do I post a job?</h3>
                <p className="text-muted-foreground">
                  To post a job, click on "Post a Job", fill out the details, and submit. Our team will contact you on the modalities.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-medium mb-3">How much does it cost to post a job?</h3>
                <p className="text-muted-foreground">
                  We offer various pricing tiers to suit different needs. Basic listings start at GH¢ 500 for 30 days. Contact us for custom enterprise plans.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-medium mb-3">Can I apply for jobs?</h3>
                <p className="text-muted-foreground">
                  You apply for jobs by filling out details on .
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-medium mb-3">How long does the job posting process take?</h3>
                <p className="text-muted-foreground">
                  Once you submit your job posting details, our team will review and publish it within 24-48 hours. Premium listings get priority review.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}