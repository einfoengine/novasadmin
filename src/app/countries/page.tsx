'use client';

import React, { useState, useEffect } from "react";
import { useTheme } from '@/app/providers';
import TableBuilder from "@/components/TableBuilder";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';

interface Country {
  id: string;
  name: string;
  totalStores: number;
  currency: string;
  exchangeRate: number;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/data/countries.json');
        const data = await response.json();
        setCountries(data.countries || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading countries...</div>
        </div>
      </div>
    );
  }

  const handleRowClick = (country: Country) => {
    router.push(`/countries/${country.id}`);
  };

  const handleEdit = (country: Country) => {
    router.push(`/countries/${country.id}/edit`);
  };

  const handleDelete = async (country: Country) => {
    if (window.confirm(`Are you sure you want to delete ${country.name}?`)) {
      try {
        // Here you would typically make an API call to delete the country
        // For now, we'll just remove it from the local state
        setCountries(countries.filter(c => c.id !== country.id));
      } catch (error) {
        console.error('Error deleting country:', error);
        alert('Failed to delete country. Please try again.');
      }
    }
  };

  const columns = [
    { 
      key: 'name', 
      label: 'Country',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'id', 
      label: 'Code',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'totalStores', 
      label: 'Total Stores',
      type: 'number' as const,
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'currency', 
      label: 'Currency',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'exchangeRate', 
      label: 'Exchange Rate',
      type: 'number' as const,
      format: (value: unknown) => (value as number).toFixed(2),
      className: 'text-gray-900 dark:text-white'
    }
  ];

  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
        <TableBuilder
          data={countries}
          columns={columns}
          title="Countries"
          icon={<GlobeAltIcon className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />}
          searchable
          selectable
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actionButton={{
            label: 'Add Country',
            href: '/countries/new'
          }}
        />
      </div>
    </div>
  );
}
