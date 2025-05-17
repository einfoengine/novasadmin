"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  image: string;
  size: string;
  material: string;
  printing: string;
  surface: string;
  lamination: string;
  finishing: string;
  pricing: number;
  description: string;
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        const foundProduct = data.products.find((p: Product) => p.id === params.id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Product not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="p-2 rounded-md hover:bg-gray-100 duration-200"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">{product.name}</h1>
        </div>
        <Link
          href={`/products/${product.id}/edit`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark duration-200"
        >
          <PencilIcon className="h-5 w-5" />
          Edit Product
        </Link>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden bg-white shadow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Product Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Size</p>
                <p className="font-medium">{product.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Material</p>
                <p className="font-medium">{product.material}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Printing</p>
                <p className="font-medium">{product.printing}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Surface</p>
                <p className="font-medium">{product.surface}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lamination</p>
                <p className="font-medium">{product.lamination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Finishing</p>
                <p className="font-medium">{product.finishing}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pricing</p>
                <p className="font-medium">${product.pricing.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 