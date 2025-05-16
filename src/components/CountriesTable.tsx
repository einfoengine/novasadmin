'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import TableBuilder from './TableBuilder';

interface Country {
  id: string;
  name: string;
  code: string;
  population: number;
  area: number;
  gdp: number;
  status: 'active' | 'inactive';
  lastUpdated: string;
}

const CountriesTable = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/api/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const columns = [
    { key: 'name', label: 'Country Name', type: 'link' as const, linkHref: (value: unknown) => `/countries/${value}` },
    { key: 'code', label: 'Country Code' },
    { key: 'population', label: 'Population', type: 'number' as const },
    { key: 'area', label: 'Area (km²)', type: 'number' as const },
    { key: 'gdp', label: 'GDP (USD)', type: 'currency' as const },
    { key: 'status', label: 'Status', type: 'status' as const },
    { key: 'lastUpdated', label: 'Last Updated', type: 'date' as const },
  ];

  const handleRowClick = (country: Country) => {
    router.push(`/countries/${country.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableBuilder
      data={countries}
      columns={columns}
      title="Countries"
      icon={<GlobeAltIcon className="h-6 w-6" />}
      onRowClick={handleRowClick}
      actionButton={{
        label: 'Add Country',
        href: '/countries/new',
      }}
    />
  );
};

export default CountriesTable;
