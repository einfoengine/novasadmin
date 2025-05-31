'use client';

import React, { useState, useEffect } from "react";
import { useTheme } from '@/app/providers';
import { useRouter } from 'next/navigation';
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import TableBuilder from "@/components/TableBuilder";

interface Country {
  id: string;
  name: string;
  currency: string;
  exchangeRate: number;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [storeCounts, setStoreCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, storesRes] = await Promise.all([
          fetch('/data/countries.json'),
          fetch('/data/stores.json')
        ]);
        const countriesData = await countriesRes.json();
        const storesData = await storesRes.json();
        setCountries(countriesData.countries);
        // Count stores per countryId
        const counts: Record<string, number> = {};
        for (const store of storesData.stores) {
          counts[store.countryId] = (counts[store.countryId] || 0) + 1;
        }
        setStoreCounts(counts);
      } catch (error) {
        console.error('Error fetching countries or stores:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
      className: 'text-gray-900 dark:text-white',
      render: (item: unknown) => <>{storeCounts[(item as Country).id] || 0}</>
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
