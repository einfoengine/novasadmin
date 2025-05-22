"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PrinterIcon } from '@heroicons/react/24/outline';
import TableBuilder from '@/components/TableBuilder';

interface Printer {
  id: string;
  name: string;
  segment: string;
  printerType: string;
  dependency_type: string;
  dependencies: string[];
  description: string;
  size: string;
  color: string;
  price: string;
  image?: string;
}

export default function PrintersPage() {
  const router = useRouter();
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await fetch('/data/printers.json');
        if (!response.ok) throw new Error('Failed to fetch printers');
        
        const data = await response.json();
        setPrinters(data.printers || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching printers:', error);
        setError(error instanceof Error ? error.message : 'Failed to load printers');
      } finally {
        setLoading(false);
      }
    };

    fetchPrinters();
  }, []);

  const handleEdit = (printer: Printer) => {
    router.push(`/productions/printers/${printer.id}/edit`);
  };

  const handleRowClick = (printer: Printer) => {
    router.push(`/productions/printers/${printer.id}`);
  };

  const columns = [
    {
      key: 'image',
      label: 'Picture',
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
      key: 'printerType',
      label: 'Type',
      type: 'text' as const,
      format: (value: unknown) => String(value).split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
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
        <TableBuilder
          data={printers}
          columns={columns}
          title="Printers"
          icon={<PrinterIcon className="w-6 h-6" />}
          onEdit={handleEdit}
          onRowClick={handleRowClick}
          searchable
          selectable
          actionButton={{
            label: 'Add Printer',
            href: '/productions/printers/new'
          }}
        />
      </div>
    </div>
  );
} 