"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingStorefrontIcon, MapPinIcon, PhoneIcon, ShieldCheckIcon, ArrowsPointingOutIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

interface Store {
  id: string;
  name: string;
  country: string;
  contactNumber: string;
  type: string;
  securityGauge: string;
  storeSize: string;
  address: string;
  openingHours: string;
  manager: string;
  status: string;
}

export default function StoreDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch('/data/stores.json');
        const data = await response.json();
        const foundStore = data.stores.find((s: Store) => s.id === params.id);
        setStore(foundStore || null);
      } catch (error) {
        console.error('Error fetching store:', error);
        setStore(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [params.id]);

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
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{store.name}</h1>
              <p className="text-gray-500">Store ID: {store.id}</p>
            </div>
            <button
              onClick={() => router.push(`/stores/${store.id}/edit`)}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Edit Store
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-gray-900">{store.address}</p>
                  <p className="text-gray-500">{store.country}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                  <p className="mt-1 text-gray-900">{store.contactNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Opening Hours</h3>
                  <p className="mt-1 text-gray-900">{store.openingHours}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BuildingStorefrontIcon className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Store Type</h3>
                  <p className="mt-1">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {store.type}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Security Gauge</h3>
                  <p className="mt-1 text-gray-900">{store.securityGauge}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowsPointingOutIcon className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Store Size</h3>
                  <p className="mt-1 text-gray-900">{store.storeSize}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserIcon className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Store Manager</h3>
                  <p className="mt-1 text-gray-900">{store.manager}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Status:</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                store.status === 'Active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {store.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 