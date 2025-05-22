'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingStorefrontIcon, PencilIcon } from '@heroicons/react/24/outline';
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
    },
    {
      key: 'actions',
      label: '',
      type: 'custom',
      className: 'w-12 text-right',
      render: (item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/stores/${(item as Store).id}/edit`);
          }}
          className="p-1 text-gray-500 hover:text-primary focus:outline-none"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      )
    }
  ];

  const handleRowClick = (item: Store) => {
    router.push(`/stores/${item.id}`);
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BuildingStorefrontIcon className="w-8 h-8 text-gray-500" />
              <h1 className="text-2xl font-semibold text-gray-900">Stores</h1>
            </div>
            <button
              onClick={() => router.push('/stores/new')}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Add Store
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Stores</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stores.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Active Stores</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {stores.filter(store => store.status === 'Active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Type A Stores</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {stores.filter(store => store.type === 'A').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Type B & C Stores</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {stores.filter(store => store.type === 'B' || store.type === 'C').length}
            </p>
          </div>
        </div>

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