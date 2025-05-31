'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingStorefrontIcon, MapPinIcon, PhoneIcon, ArrowsPointingOutIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface Store {
  id: string;
  storeCode?: string;
  name: string;
  country: string;
  countryId: string;
  contact: string;
  contactPerson?: string;
  type: string;
  size: string;
  address: string;
  status: string;
  description?: string;
}

export default function StoreDetailsClient({ id }: { id: string }) {
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch('/data/stores.json');
        const data = await response.json();
        const foundStore = data.stores.find((s: Store) => s.id === id);
        setStore(foundStore || null);
      } catch (error) {
        console.error('Error fetching store:', error);
        setStore(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading store details...</div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Store not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Details Section */}
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{store.name}</h1>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gray-400 text-xs">Store ID:</span>
                <span className="text-gray-700 text-xs font-mono">{store.id}</span>
              </div>
              {store.storeCode && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-400 text-xs">Store Code:</span>
                  <span className="text-gray-700 text-xs font-mono">{store.storeCode}</span>
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${
                  store.type === 'A' ? 'bg-blue-100 text-blue-800' :
                  store.type === 'B' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  Type: {store.type}
                </span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full shadow-sm bg-gray-200 text-gray-700">
                  Size: {store.size}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${
                  store.status === 'Active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {store.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/stores/${store.id}/edit`)}
              className="px-6 py-2 text-sm font-semibold text-white bg-primary rounded-lg shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
            >
              Edit Store
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1 text-gray-900">{store.address}</p>
                <p className="text-gray-500">{store.country}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <PhoneIcon className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                <p className="mt-1 text-gray-900">{store.contact}</p>
                {store.contactPerson && (
                  <p className="text-sm text-gray-500">Contact Person: {store.contactPerson}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BuildingStorefrontIcon className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Store Type</h3>
                <p className="mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    store.type === 'A' ? 'bg-blue-100 text-blue-800' :
                    store.type === 'B' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {store.type}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ArrowsPointingOutIcon className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Store Size</h3>
                <p className="mt-1 text-gray-900">{store.size}</p>
              </div>
            </div>

            {store.description && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p className="text-gray-700 leading-relaxed">{store.description}</p>
              </div>
            )}
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-72 flex-shrink-0 flex justify-center items-start">
          {!imageError ? (
            <img
              src={`/images/stores/${store.id}.jpg`}
              alt={`${store.name} image`}
              className="w-64 h-64 object-cover object-center rounded-xl shadow border bg-white"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-64 h-64 flex flex-col items-center justify-center rounded-xl shadow border bg-gray-100 text-gray-400">
              <PhotoIcon className="w-20 h-20 mb-2" />
              <span className="text-base">No image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 