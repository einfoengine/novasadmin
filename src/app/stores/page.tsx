'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingStorefrontIcon, MapPinIcon, PhoneIcon, ShieldCheckIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import TableBuilder from '@/components/TableBuilder';
import StatsCard from "@/components/StatsCard";

interface Store {
  id: string;
  name: string;
  country: string;
  contactNumber: string;
  type: string;
  securityGauge: string;
  storeSize: string;
  address: string;
  openingHours: string;
  manager: string;
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
      className: 'font-medium hover:text-primary cursor-pointer'
    },
    { 
      key: 'country', 
      label: 'Country',
      render: (item: Store) => (
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-gray-500" />
          <span>{item.country}</span>
        </div>
      )
    },
    { 
      key: 'contactNumber', 
      label: 'Contact',
      render: (item: Store) => (
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 text-gray-500" />
          <span>{item.contactNumber}</span>
        </div>
      )
    },
    { 
      key: 'type', 
      label: 'Type',
      render: (item: Store) => (
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
          {item.type}
        </span>
      )
    },
    { 
      key: 'securityGauge', 
      label: 'Security',
      render: (item: Store) => (
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="w-4 h-4 text-gray-500" />
          <span>{item.securityGauge}</span>
        </div>
      )
    },
    { 
      key: 'storeSize', 
      label: 'Size',
      render: (item: Store) => (
        <div className="flex items-center gap-2">
          <ArrowsPointingOutIcon className="w-4 h-4 text-gray-500" />
          <span>{item.storeSize}</span>
        </div>
      )
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

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Total Stores"
          value={stores.length.toString()}
          icon={<BuildingStorefrontIcon className="w-6 h-6" />}
          iconColor="#6366f1"
          iconBg="#eef2ff"
          percentage=""
          percentageColor="#6b7280"
          trend="+2"
        />
        <StatsCard
          title="Active Stores"
          value={stores.filter(store => store.status === 'Active').length.toString()}
          icon={<BuildingStorefrontIcon className="w-6 h-6" />}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          percentage=""
          percentageColor="#6b7280"
          trend="+1"
        />
        <StatsCard
          title="Average Store Size"
          value={`${stores.reduce((acc, store) => {
            const size = parseInt(store.storeSize);
            return acc + (isNaN(size) ? 0 : size);
          }, 0) / stores.length} sq ft`}
          icon={<ArrowsPointingOutIcon className="w-6 h-6" />}
          iconColor="#f59e42"
          iconBg="#fff7ed"
          percentage=""
          percentageColor="#6b7280"
          trend="+5%"
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