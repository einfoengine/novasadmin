"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ProductForm from '@/components/ProductForm';

interface ProductFormData {
  name: string;
  size: string;
  material: string[];
  printing: string[];
  surface: string;
  lamination: string;
  finishing: string;
  pricing: number;
  description: string;
  image: string;
}

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = async (formData: ProductFormData) => {
    // TODO: Implement product creation logic
    console.log('Form submitted:', formData);
    router.push('/products');
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-semibold">Add New Product</h1>
        </div>
      </div>

      {/* Main Content */}
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        submitLabel="Create Product"
      />
    </div>
  );
} 