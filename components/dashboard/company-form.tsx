"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company, companySchema } from '@/lib/db/schema';
import { type CompanyFormValues } from '@/lib/types';
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
import { CheckCircle2 } from 'lucide-react';

interface CompanyFormProps {
  initialData?: Company;
  onSubmit: (data: CompanyFormValues) => void;
  mode?: 'create' | 'edit';
}

const CompanyForm = ({ initialData, onSubmit, mode = 'create' }: CompanyFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: initialData || {
      name: '',
      logo: '',
      description: '',
      founded: '',
      location: '',
      employees: '',
      website: '',
    },
  });

  const handleSubmit = async (values: CompanyFormValues) => {
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
    setIsSubmitted(true);
    if (mode === 'create') {
      form.reset();
    }
  };

  if (isSubmitted && mode === 'create') {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Company {mode === 'edit' ? 'Updated' : 'Created'} Successfully!</h3>
        <p className="mt-2 text-muted-foreground">
          The company has been {mode === 'edit' ? 'updated' : 'added to the system'}.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)} 
          className="mt-6"
        >
          Add Another Company
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/logo.png" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a URL for the company logo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief description of the company..." 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="founded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Founded Year</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2010" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. San Francisco, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="employees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Employees</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 100+" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (mode === 'edit' ? 'Updating...' : 'Creating...') : (mode === 'edit' ? 'Update Company' : 'Create Company')}
        </Button>
      </form>
    </Form>
  );
};

export default CompanyForm;