"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobSchema, type JobFormValues } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { getCategories, getJobTypes } from '@/lib/data';
import { createJob, updateJob } from '@/lib/db/queries';
import { CheckCircle2 } from 'lucide-react';
import { Job, Company } from '@/lib/types';

interface JobPostingFormProps {
  initialData?: Job;
  mode?: 'create' | 'edit';
}

const JobPostingForm = ({ initialData, mode = 'create' }: JobPostingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();
  
  const categories = getCategories();
  const jobTypes = getJobTypes();

  useEffect(() => {
    // Fetch companies on component mount
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies');
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: initialData ? {
      id: Number(initialData.id),
      title: initialData.title,
      companyId: initialData.companyId,
      logo: initialData.logo,
      location: initialData.location,
      salary: initialData.salary,
      type: initialData.type,
      category: initialData.category,
      description: initialData.description,
      requirements: initialData.requirements,
      benefits: initialData.benefits,
      postedAt: new Date(initialData.postedAt),
      featured: initialData.featured,
      createdAt: new Date(),
      updatedAt: new Date()
    } : {
      title: '',
      companyId: undefined,
      logo: '',
      location: '',
      salary: '',
      type: '',
      category: '',
      description: '',
      requirements: '',
      benefits: '',
      featured: false,
      postedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  const onSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    try {
      if (mode === 'edit' && initialData?.id) {
        await updateJob(initialData.id, values);
      } else {
        await createJob(values);
      }
      setIsSubmitted(true);
      if (mode === 'edit') {
        router.push('/dashboard');
      } else {
        form.reset();
      }
    } catch (error) {
      console.error('Error saving job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && mode !== 'edit') {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Job Posted Successfully!</h3>
        <p className="mt-2 text-muted-foreground">
          Your job listing has been {mode === 'edit' ? 'updated' : 'created'} and is now live.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)} 
          className="mt-6"
        >
          Post Another Job
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(Number(value))} 
                  defaultValue={field.value ? String(field.value) : undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={String(company.id)}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. San Francisco, CA (Remote)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. $100,000 - $130,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured Listing</FormLabel>
                <FormDescription>
                  Featured listings appear at the top of search results and on the homepage
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the role and responsibilities" 
                  className="min-h-[150px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List the requirements" 
                  className="min-h-[150px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benefits</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List the benefits" 
                  className="min-h-[150px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (mode === 'edit' ? 'Updating...' : 'Posting...') : (mode === 'edit' ? 'Update Job' : 'Post Job')}
        </Button>
      </form>
    </Form>
  );
};

export default JobPostingForm;