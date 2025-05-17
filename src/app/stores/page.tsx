'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../providers';
import TableBuilder from '@/components/TableBuilder';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

interface Store {
  id: string;
  store_id?: number;
  storeId?: string;
  store_name?: string;
  storeName?: string;
  zip_code?: string;
  country?: string;
  countryName?: string;
  store_code?: string;
  address: string;
  type_of_store?: string;
  quantity?: number;
  security_gate_count?: number;
  size?: string;
  comment?: string;
  storeManagerId?: string;
  storeContact?: string;
}

interface RawStore {
  store_id?: number;
  storeId?: string;
  store_name?: string;
  storeName?: string;
  zip_code?: string;
  country?: string;
  countryName?: string;
  store_code?: string;
  address: string;
  type_of_store?: string;
  quantity?: number;
  security_gate_count?: number;
  size?: string;
  comment?: string;
  storeManagerId?: string;
  storeContact?: string;
}

export default function StoresPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/data/stores.json');
        const data = await response.json();
        // Transform the data to ensure consistent structure
        const transformedStores = (data.stores || []).map((store: RawStore) => ({
          id: store.store_id?.toString() || store.storeId || '',
          store_id: store.store_id,
          storeId: store.storeId,
          store_name: store.store_name || store.storeName,
          storeName: store.storeName,
          zip_code: store.zip_code,
          country: store.country || store.countryName,
          countryName: store.countryName,
          store_code: store.store_code,
          address: store.address,
          type_of_store: store.type_of_store,
          quantity: store.quantity,
          security_gate_count: store.security_gate_count,
          size: store.size,
          comment: store.comment,
          storeManagerId: store.storeManagerId,
          storeContact: store.storeContact,
        }));
        setStores(transformedStores);
      } catch (error) {
        console.error('Error fetching stores:', error);
        setStores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleRowClick = (item: { id: string }) => {
    router.push(`/stores/${item.id}`);
  };

  const columns = [
    {
      key: 'store_name',
      label: 'Store Name',
      type: 'text' as const,
    },
    {
      key: 'store_code',
      label: 'Store Code',
      type: 'text' as const,
    },
    {
      key: 'country',
      label: 'Country',
      type: 'text' as const,
    },
    {
      key: 'type_of_store',
      label: 'Type',
      type: 'text' as const,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      type: 'number' as const,
      format: (value: unknown) => {
        if (value === undefined || value === null) return '-';
        return (value as number).toLocaleString();
      },
    },
    {
      key: 'security_gate_count',
      label: 'Security Gates',
      type: 'number' as const,
      format: (value: unknown) => {
        if (value === undefined || value === null) return '-';
        return value.toString();
      },
    },
    {
      key: 'size',
      label: 'Size',
      type: 'text' as const,
    },
    {
      key: 'zip_code',
      label: 'ZIP Code',
      type: 'text' as const,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <TableBuilder
        data={stores}
        columns={columns}
        onRowClick={handleRowClick}
        searchable
        selectable
        title="Stores"
        icon={<BuildingStorefrontIcon className="h-6 w-6" />}
        actionButton={{
          label: 'Add Store',
          href: '/stores/new',
        }}
      />
    </main>
  );
} 