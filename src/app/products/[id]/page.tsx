"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Item {
  id: string;
  name: string;
  image: string;
  size: number[];
  materials: string[];
  'printer-ids': string[];
  'finisher-ids': string[];
  'others-ids': string[];
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  items: Item[];
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Item | null>(null);
  const [parentProduct, setParentProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        const allProducts = data.products;
        
        // Find the product and its parent
        for (const parent of allProducts) {
          const foundItem = parent.items.find((item: Item) => item.id === params.id);
          if (foundItem) {
            setProduct(foundItem);
            setParentProduct(parent);
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (!product || !parentProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-2/3">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h2>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Size</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.size[0]} x {product.size[1]}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Materials</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product.materials.join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Printers</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product['printer-ids'].join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Finishers</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product['finisher-ids'].join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Others</dt>
                      <dd className="mt-1 text-sm text-gray-900">{product['others-ids'].join(', ')}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Package Information</h2>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Package Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{parentProduct.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Package Description</dt>
                      <dd className="mt-1 text-sm text-gray-900">{parentProduct.description}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Package Price</dt>
                      <dd className="mt-1 text-sm text-gray-900">${parentProduct.price.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 