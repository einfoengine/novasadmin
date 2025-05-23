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
  const [group, setGroup] = useState<Product | null>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        const foundGroup = data.products.find((p: Product) => p.id === params.id);
        if (foundGroup) {
          setGroup(foundGroup);
        }
      } catch (error) {
        console.error('Error fetching group:', error);
      }
    };

    fetchGroup();
  }, [params.id]);

  if (!group) {
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
          {/* Group Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{group.name}</h1>
            <p className="text-gray-600">{group.description}</p>
            <div className="mt-2 text-lg font-medium text-gray-900">
              Package Price: ${group.price.toFixed(2)}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Size</dt>
                      <dd className="mt-1 text-sm text-gray-900">{item.size[0]} x {item.size[1]}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Materials</dt>
                      <dd className="mt-1 text-sm text-gray-900">{item.materials.join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Printers</dt>
                      <dd className="mt-1 text-sm text-gray-900">{item['printer-ids'].join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Finishers</dt>
                      <dd className="mt-1 text-sm text-gray-900">{item['finisher-ids'].join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Others</dt>
                      <dd className="mt-1 text-sm text-gray-900">{item['others-ids'].join(', ')}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 