"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ProductForm from '@/components/ProductForm';

interface ProductData extends ProductFormData {
  id: string;
}

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

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        const product = data.products.find((p: ProductData) => p.id === resolvedParams.id);
        if (product) {
          setProduct(product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  const handleSubmit = async (formData: ProductFormData) => {
    // TODO: Implement product update logic
    console.log('Form submitted:', { ...formData, id: resolvedParams.id });
    router.push('/products');
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Product not found</h1>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-semibold">Edit Product</h1>
        </div>
      </div>

      {/* Main Content */}
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        submitLabel="Update Product"
      />
    </div>
  );
} 