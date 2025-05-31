'use client';

import React, { useState, useEffect } from "react";
import { useTheme } from '@/app/providers';
import { useRouter } from 'next/navigation';
import { GlobeAltIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import TableBuilder from "@/components/TableBuilder";

interface Country {
  id: string;
  name: string;
  totalStores: number;
  currency: string;
  exchangeRate: number;
}

interface Store {
  id: string;
  storeCode: string;
  name: string;
  country: string;
  countryId: string;
  contact: string;
  contactPerson: string;
  type: string;
  size: string;
  securityGate: string;
  address: string;
  status: string;
  description?: string;
}

export default function CountryDetailsClient({ id }: { id: string }) {
  const [country, setCountry] = useState<Country | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
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

        const [countriesData, storesData] = await Promise.all([
          countriesRes.json(),
          storesRes.json()
        ]);

        const foundCountry = countriesData.countries.find((c: Country) => c.id === id);
        if (foundCountry) {
          setCountry(foundCountry);
          const countryStores = storesData.stores.filter((s: Store) => s.countryId === id);
          setStores(countryStores);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading country details...</div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Country not found</div>
        </div>
      </div>
    );
  }

  const storeColumns = [
    { 
      key: 'name', 
      label: 'Store Name',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'storeCode', 
      label: 'Store Code',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'type', 
      label: 'Type',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'size', 
      label: 'Size',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'status', 
      label: 'Status',
      className: 'text-gray-900 dark:text-white'
    }
  ];

  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Country Information Card */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow mb-6 p-6`}>
        <div className="flex items-center gap-4 mb-6">
          <GlobeAltIcon className={`h-8 w-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{country.name}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Country Code</h3>
            <p className="mt-1 text-lg text-gray-900 dark:text-white">{country.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Stores</h3>
            <p className="mt-1 text-lg text-gray-900 dark:text-white">{country.totalStores}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Currency</h3>
            <p className="mt-1 text-lg text-gray-900 dark:text-white">{country.currency}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Exchange Rate</h3>
            <p className="mt-1 text-lg text-gray-900 dark:text-white">{country.exchangeRate.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Stores Table */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
        <TableBuilder
          data={stores}
          columns={storeColumns}
          title="Stores"
          icon={<BuildingStorefrontIcon className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />}
          searchable
          selectable
          onRowClick={(store) => router.push(`/stores/${store.id}`)}
          actionButton={{
            label: 'Add Store',
            href: '/stores/new'
          }}
        />
      </div>
    </div>
  );
} 