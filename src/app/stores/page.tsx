'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import TableBuilder from '@/components/TableBuilder';
import StatsCard from "@/components/StatsCard";

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

export default function StoresPage() {
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/data/stores.json');
        const data = await response.json();
        setStores(data.stores || []);
      } catch (error) {
        console.error('Error fetching stores:', error);
        setStores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleEdit = (store: Store) => {
    router.push(`/stores/${store.id}/edit`);
  };

  const handleDelete = (store: Store) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      setStores(prev => prev.filter(s => s.id !== store.id));
    }
  };

  const columns = [
    { 
      key: 'name', 
      label: 'Store Name',
      type: 'text' as const,
      className: 'font-medium hover:text-primary cursor-pointer'
    },
    { 
      key: 'country', 
      label: 'Country',
      type: 'text' as const,
      className: 'flex items-center gap-2'
    },
    { 
      key: 'contact', 
      label: 'Contact',
      type: 'text' as const,
      className: 'flex items-center gap-2'
    },
    { 
      key: 'type', 
      label: 'Type',
      type: 'status' as const,
      className: 'px-2 py-1 text-xs font-medium rounded-full'
    },
    { 
      key: 'size', 
      label: 'Size',
      type: 'text' as const,
      className: 'flex items-center gap-2'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'status' as const,
      className: 'px-2 py-1 text-xs font-medium rounded-full'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading stores...</div>
        </div>
      </div>
    );
  }

  const activeStores = stores.filter(store => store.status === 'Active').length;
  const typeAStores = stores.filter(store => store.type === 'A').length;
  const typeBStores = stores.filter(store => store.type === 'B').length;
  const typeCStores = stores.filter(store => store.type === 'C').length;

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Stores"
          value={stores.length.toString()}
          icon={<BuildingStorefrontIcon className="w-6 h-6" />}
          iconColor="#6366f1"
          iconBg="#eef2ff"
          percentage=""
          percentageColor="#6b7280"
          trend=""
        />
        <StatsCard
          title="Active Stores"
          value={activeStores.toString()}
          icon={<BuildingStorefrontIcon className="w-6 h-6" />}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          percentage=""
          percentageColor="#6b7280"
          trend=""
        />
        <StatsCard
          title="Type A Stores"
          value={typeAStores.toString()}
          icon={<BuildingStorefrontIcon className="w-6 h-6" />}
          iconColor="#3b82f6"
          iconBg="#eff6ff"
          percentage=""
          percentageColor="#6b7280"
          trend=""
        />
        <StatsCard
          title="Type B & C Stores"
          value={`${typeBStores + typeCStores}`}
          icon={<BuildingStorefrontIcon className="w-6 h-6" />}
          iconColor="#f59e0b"
          iconBg="#fffbeb"
          percentage=""
          percentageColor="#6b7280"
          trend=""
        />
      </div>

      <div className="rounded-lg shadow">
        <TableBuilder
          data={stores}
          columns={columns}
          title="Stores"
          icon={<BuildingStorefrontIcon className="h-6 w-6" />}
          searchable
          selectable
          onRowClick={(store) => router.push(`/stores/${store.id}`)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actionButton={{
            label: 'Add Store',
            href: '/stores/new',
          }}
        />
      </div>
    </div>
  );
} 