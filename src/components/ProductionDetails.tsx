"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ProductionItem {
  id: string;
  name: string;
  segment: string;
  description: string;
  size: string;
  color: string;
  price: string;
  image?: string;
  dependencies?: string[];
  [key: string]: unknown; // For additional type-specific fields
}

interface ProductionDetailsProps {
  title: string;
  icon: React.ReactNode;
  item: ProductionItem | null;
  loading: boolean;
  error: string | null;
  additionalFields?: {
    name: string;
    label: string;
    value: string | string[];
    type?: 'text' | 'list' | 'price';
  }[];
}

export default function ProductionDetails({
  title,
  icon,
  item,
  loading,
  error,
  additionalFields = [],
}: ProductionDetailsProps) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error || 'Item not found'}</div>
      </div>
    );
  }

  const formatValue = (value: string | string[], type?: string) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (type === 'price') {
      return `$${value}`;
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {icon}
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push(`/productions/${item.segment}/${item.id}/edit`)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Image */}
              <div className="md:col-span-1">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      {icon}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">ID: {item.id}</p>
                </div>

                {/* Additional Fields */}
                {additionalFields.map((field) => (
                  <div key={field.name}>
                    <h3 className="text-sm font-medium text-gray-500">{field.label}</h3>
                    <p className="mt-1 text-base text-gray-900">
                      {formatValue(field.value, field.type)}
                    </p>
                  </div>
                ))}

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Size</h3>
                  <p className="mt-1 text-base text-gray-900">{item.size}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Color</h3>
                  <p className="mt-1 text-base text-gray-900">{item.color}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p className="mt-1 text-base text-gray-900">${item.price}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-base text-gray-900">{item.description}</p>
                </div>

                {item.dependencies && item.dependencies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dependencies</h3>
                    <p className="mt-1 text-base text-gray-900">
                      {item.dependencies.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 