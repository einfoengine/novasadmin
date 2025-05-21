"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

interface StoreFormData {
  name: string;
  country: string;
  countryId: string;
  contact: string;
  type: string;
  size: string;
  address: string;
  status: string;
  description: string;
}

const initialFormData: StoreFormData = {
  name: '',
  country: '',
  countryId: '',
  contact: '',
  type: '',
  size: '',
  address: '',
  status: 'Active',
  description: ''
};

const storeTypes = ['A', 'B', 'C'];
const storeSizes = ['Small', 'Medium', 'Large'];
const countries = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'Australia', code: 'AU' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Canada', code: 'CA' },
  { name: 'Germany', code: 'DE' }
];

export default function NewStorePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<StoreFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countries.find(c => c.name === e.target.value);
    setFormData(prev => ({
      ...prev,
      country: e.target.value,
      countryId: selectedCountry?.code || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate a new store ID
      const newStoreId = `ST${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: newStoreId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create store');
      }

      router.push('/stores');
    } catch (error) {
      console.error('Error creating store:', error);
      // Handle error (you might want to show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BuildingStorefrontIcon className="w-6 h-6 text-gray-500" />
                <h1 className="text-xl font-semibold text-gray-900">Add New Store</h1>
              </div>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store Name */}
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Store Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Enter store name"
                />
              </div>

              {/* Country */}
              <div className="space-y-1">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="">Select a country</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact */}
              <div className="space-y-1">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Store Type */}
              <div className="space-y-1">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Store Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="">Select a type</option>
                  {storeTypes.map(type => (
                    <option key={type} value={type}>
                      Type {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Store Size */}
              <div className="space-y-1">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Store Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="">Select a size</option>
                  {storeSizes.map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="space-y-1">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter store address"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter store description"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Store'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 