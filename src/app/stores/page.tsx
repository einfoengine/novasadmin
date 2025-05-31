'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import TableBuilder from '@/components/TableBuilder';

interface Store {
  id: string;
  storeCode: string;
  name: string;
  country: string;
  contact: string;
  type: string;
  securityGate: string;
  size: string;
  status: string;
}

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'date' | 'status' | 'link' | 'custom' | 'image';
  format?: (value: unknown) => string;
  render?: <T>(item: T) => React.ReactNode;
  className?: string;
  linkHref?: (value: unknown) => string;
}

export default function StoresPage() {
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/data/stores.json');
        if (!response.ok) throw new Error('Failed to fetch stores');
        const data = await response.json();
        setStores(data.stores);
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const columns: Column[] = [
    {
      key: 'storeCode',
      label: 'Store Code',
      type: 'text',
      className: 'font-medium'
    },
    {
      key: 'name',
      label: 'Store Name',
      type: 'text',
      className: 'font-medium'
    },
    {
      key: 'country',
      label: 'Country',
      type: 'text'
    },
    {
      key: 'contact',
      label: 'Contact',
      type: 'text'
    },
    {
      key: 'type',
      label: 'Type',
      type: 'status',
      className: 'text-center'
    },
    {
      key: 'securityGate',
      label: 'Security Gate',
      type: 'status',
      className: 'text-center'
    },
    {
      key: 'size',
      label: 'Size',
      type: 'text',
      className: 'text-center'
    }
  ];

  const handleRowClick = (item: Store) => {
    router.push(`/stores/${item.id}`);
  };

  const handleEdit = (store: Store) => {
    router.push(`/stores/${store.id}/edit`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <TableBuilder
            data={stores}
            columns={columns}
            title="Stores"
            icon={<BuildingStorefrontIcon className="h-6 w-6" />}
            searchable
            selectable
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            actionButton={{
              label: 'Add Store',
              href: '/stores/new'
            }}
          />
        </div>
      </div>
    </div>
  );
} 