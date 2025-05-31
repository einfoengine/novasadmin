"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import TableBuilder from '@/components/TableBuilder';

interface Finisher {
  id: string;
  name: string;
  segment: string;
  finisherType: string;
  dependency_type: string;
  dependencies: string[];
  description: string;
  size: string;
  color: string;
  price: string;
  image?: string;
}

export default function FinishersPage() {
  const router = useRouter();
  const [finishers, setFinishers] = useState<Finisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinishers = async () => {
      try {
        const response = await fetch('/data/finishers.json');
        if (!response.ok) throw new Error('Failed to fetch finishers');
        
        const data = await response.json();
        setFinishers(data.finishers);
        setError(null);
      } catch (error) {
        console.error('Error fetching finishers:', error);
        setError(error instanceof Error ? error.message : 'Failed to load finishers');
      } finally {
        setLoading(false);
      }
    };

    fetchFinishers();
  }, []);

  const columns = [
    {
      key: 'image',
      label: 'Image',
      type: 'image' as const,
      className: 'w-16'
    },
    {
      key: 'name',
      label: 'Name',
      type: 'text' as const,
      className: 'font-medium'
    },
    {
      key: 'finisherType',
      label: 'Type',
      type: 'text' as const,
      render: (item: Finisher) => (
        <span className="capitalize">{item.finisherType.replace(/-/g, ' ')}</span>
      )
    },
    {
      key: 'size',
      label: 'Size',
      type: 'text' as const
    },
    {
      key: 'price',
      label: 'Price',
      type: 'currency' as const
    }
  ];

  const handleRowClick = (item: Finisher) => {
    router.push(`/productions/finishers/${item.id}`);
  };

  const handleEdit = (item: Finisher) => {
    router.push(`/productions/finishers/${item.id}/edit`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Finishers</h1>
          <button
            type="button"
            onClick={() => router.push('/productions/finishers/new')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Finisher
          </button>
        </div> */}

        <TableBuilder
          data={finishers}
          columns={columns}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          selectable
        />
      </div>
    </div>
  );
} 