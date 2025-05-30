"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Search } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobFilterSchema } from '@/lib/schemas';
import { JobFilters } from '@/lib/types';

interface JobFilterProps {
  categories: string[];
  locations: string[];
  jobTypes: string[];
  initialValues?: JobFilters;
}

const JobFilter = ({ 
  categories,
  locations,
  jobTypes,
  initialValues = {}
}: JobFilterProps) => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<z.infer<typeof jobFilterSchema>>({
    resolver: zodResolver(jobFilterSchema),
    defaultValues: {
      search: initialValues.search || '',
      category: initialValues.category || '',
      location: initialValues.location || '',
      type: initialValues.type || '',
    },
  });

  const onSubmit = (values: z.infer<typeof jobFilterSchema>) => {
    setIsSearching(true);
    
    // Build query string
    const params = new URLSearchParams();
    
    if (values.search && values.search.trim() !== '') {
      params.append('search', values.search);
    }
    
    if (values.category) {
      params.append('category', values.category);
    }
    
    if (values.location) {
      params.append('location', values.location);
    }
    
    if (values.type) {
      params.append('type', values.type);
    }
    
    const queryString = params.toString();
    router.push(`/jobs${queryString ? `?${queryString}` : ''}`);
    
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="col-span-1 xl:col-span-2">
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Job title, company, or keywords" 
                      className="pl-9"
                      {...field} 
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={undefined}>All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={undefined}>All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="xl:col-span-1">
                <FormLabel>Job Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={undefined}>All Types</SelectItem>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSearching} 
            className="w-full md:w-auto"
          >
            {isSearching ? 'Searching...' : 'Search Jobs'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobFilter;