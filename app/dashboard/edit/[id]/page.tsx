"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import JobPostingForm from '@/components/dashboard/job-posting-form';
import { getJobById } from '@/lib/data';

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const job = getJobById(params.id);

  useEffect(() => {
    if (!job) {
      router.push('/dashboard');
    }
  }, [job, router]);

  if (!job) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Edit Job Listing</h1>
            <p className="mt-2 text-muted-foreground">
              Update the details of your job posting
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Edit Job</CardTitle>
              <CardDescription>
                Make changes to your job listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JobPostingForm initialData={job} mode="edit" />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}