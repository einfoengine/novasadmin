'use client';

import React, { useState, useEffect } from "react";
import { useTheme } from '@/app/providers';
import { useRouter } from 'next/navigation';
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import TableBuilder from "@/components/TableBuilder";

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
        setCountries(data.countries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const columns = [
    { 
      key: 'name', 
      label: 'Country Name',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'totalStores', 
      label: 'Total Stores',
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
      className: 'text-gray-900 dark:text-white'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading countries...</div>
        </div>
      </div>
    );
  }

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
          onRowClick={(country) => router.push(`/countries/${country.id}`)}
          actionButton={{
            label: 'Add Country',
            href: '/countries/new'
          }}
        />
      </div>
    </div>
  );
}
