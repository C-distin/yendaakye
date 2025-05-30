"use client";

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanyForm from '@/components/dashboard/company-form';
import CompaniesList from '@/components/dashboard/companies-list';
import { Building2, PlusCircle } from 'lucide-react';
import { Company, CompanyFormValues } from '@/lib/types';
import { getAllCompanies, addCompany, updateCompany, deleteCompany } from '@/lib/data';

export default function CompaniesPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [companies, setCompanies] = useState(getAllCompanies());
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const handleAddCompany = async (data: CompanyFormValues) => {
    const newCompany = addCompany(data);
    setCompanies(getAllCompanies());
    setActiveTab('list');
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    setActiveTab('edit');
  };

  const handleUpdateCompany = async (data: CompanyFormValues) => {
    if (editingCompany) {
      updateCompany(editingCompany.id, data);
      setCompanies(getAllCompanies());
      setEditingCompany(null);
      setActiveTab('list');
    }
  };

  const handleDeleteCompany = (id: string) => {
    deleteCompany(id);
    setCompanies(getAllCompanies());
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
              <p className="mt-2 text-muted-foreground">
                Manage companies and their information
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList>
              <TabsTrigger value="list">
                <Building2 className="mr-2 h-4 w-4" />
                Companies List
              </TabsTrigger>
              <TabsTrigger value="add">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Company
              </TabsTrigger>
              {editingCompany && (
                <TabsTrigger value="edit">
                  Edit Company
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="list">
              <CompaniesList
                companies={companies}
                onEdit={handleEditCompany}
                onDelete={handleDeleteCompany}
              />
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Company</CardTitle>
                  <CardDescription>
                    Create a new company profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyForm onSubmit={handleAddCompany} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="edit">
              {editingCompany && (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Company</CardTitle>
                    <CardDescription>
                      Update company information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CompanyForm
                      initialData={editingCompany}
                      onSubmit={handleUpdateCompany}
                      mode="edit"
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}