'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TableBuilder from '@/components/TableBuilder';
import { PencilIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

interface Store {
  id: string;
  name: string;
  country: string;
  countryId: string;
  contact: string;
  type: string;
  size: string;
  address: string;
  status: string;
}

interface Country {
  id: string;
  name: string;
  totalStores: number;
  currency: string;
  exchangeRate: number;
}

export default function CountryStoresPage() {
  const params = useParams();
  const [stores, setStores] = useState<Store[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stores data
        const storesResponse = await fetch('/data/stores.json');
        const storesData = await storesResponse.json();
        
        // Fetch countries data
        const countriesResponse = await fetch('/data/countries.json');
        const countriesData = await countriesResponse.json();
        
        // Find the current country
        const currentCountry = countriesData.countries.find(
          (c: Country) => c.id === params.id
        );
        
        if (currentCountry) {
          setCountry(currentCountry);
          
          // Filter stores for the current country and ensure each store has an id
          const countryStores = storesData.stores
            .filter((store: Store) => {
              return (
                store.country === currentCountry.name ||
                store.countryId === currentCountry.id
              );
            })
            .map((store: Store) => ({
              ...store,
              id: store.id || `store-${Math.random().toString(36).substr(2, 9)}`
            }));
          
          setStores(countryStores);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const columns = [
    {
      key: 'id',
      label: 'Store ID',
      type: 'text' as const,
    },
    {
      key: 'name',
      label: 'Store Name',
      type: 'text' as const,
    },
    {
      key: 'address',
      label: 'Address',
      type: 'text' as const,
    },
    {
      key: 'contact',
      label: 'Contact',
      type: 'text' as const,
    },
    {
      key: 'type',
      label: 'Type',
      type: 'text' as const,
    },
    {
      key: 'size',
      label: 'Size',
      type: 'text' as const,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'status' as const,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Country Details Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">Country Details</h1>
          <button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => {
              // TODO: Implement edit functionality
              console.log('Edit country:', country.id);
            }}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{country.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Stores</p>
            <p className="font-medium">{stores.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Currency</p>
            <p className="font-medium">{country.currency}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Exchange Rate</p>
            <p className="font-medium">{country.exchangeRate}</p>
          </div>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <TableBuilder
          data={stores}
          columns={columns}
          title={`Stores in ${country.name} (${stores.length} stores)`}
          icon={<BuildingStorefrontIcon className="h-6 w-6 text-gray-600" />}
          searchable={true}
          selectable={true}
          onEdit={(store) => {
            // TODO: Implement store edit functionality
            console.log('Edit store:', store.id);
          }}
          onDelete={(store) => {
            // TODO: Implement store delete functionality
            console.log('Delete store:', store.id);
          }}
          actionButton={{
            label: 'Add New Store',
            href: `/stores/new?countryId=${country.id}`
          }}
        />
      </div>
    </div>
  );
}
