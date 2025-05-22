"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BeakerIcon } from '@heroicons/react/24/outline';
import TableBuilder from '@/components/TableBuilder';

interface Material {
  id: string;
  name: string;
  segment: string;
  materialType: string;
  dependency_type: string;
  dependencies: string[];
  description: string;
  size: string;
  color: string;
  price: string;
  image?: string;
}

export default function MaterialsPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('/data/materials.json');
        if (!response.ok) throw new Error('Failed to fetch materials');
        
        const data = await response.json();
        setMaterials(data.materials || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching materials:', error);
        setError(error instanceof Error ? error.message : 'Failed to load materials');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const handleEdit = (material: Material) => {
    router.push(`/productions/materials/${material.id}/edit`);
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
      key: 'materialType',
      label: 'Type',
      type: 'text' as const,
      format: (value: unknown) => String(value).charAt(0).toUpperCase() + String(value).slice(1)
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
          data={materials}
          columns={columns}
          title="Materials"
          icon={<BeakerIcon className="w-6 h-6" />}
          onEdit={handleEdit}
          searchable
          actionButton={{
            label: 'Add Material',
            href: '/productions/materials/new'
          }}
        />
      </div>
    </div>
  );
} 