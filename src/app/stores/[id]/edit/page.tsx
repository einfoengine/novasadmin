"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

interface Store {
  id: string;
  name: string;
  storeCode: string;
  country: string;
  countryId: string;
  contact: string;
  contactPerson: string;
  type: string;
  size: string;
  securityGate: string;
  address: string;
  status: string;
  description?: string;
}

interface StoreFormData {
  name: string;
  storeCode: string;
  country: string;
  countryId: string;
  contact: string;
  contactPerson: string;
  type: string;
  size: string;
  securityGate: string;
  address: string;
  status: string;
  description: string;
}

const initialFormData: StoreFormData = {
  name: '',
  storeCode: '',
  country: '',
  countryId: '',
  contact: '',
  contactPerson: '',
  type: '',
  size: '',
  securityGate: '',
  address: '',
  status: 'Active',
  description: ''
};

const storeTypes = ['A', 'B', 'C'];
const storeSizes = ['Small', 'Medium', 'Large'];
const securityGates = ['Low', 'Medium', 'High'];
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

export default function EditStorePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<StoreFormData>(initialFormData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch('/api/stores');
        if (!response.ok) throw new Error('Failed to fetch stores');
        
        const data = await response.json();
        const store = data.stores.find((s: Store) => s.id === params.id);
        
        if (store) {
          setFormData({
            name: store.name || '',
            storeCode: store.storeCode || '',
            country: store.country || '',
            countryId: store.countryId || '',
            contact: store.contact || '',
            contactPerson: store.contactPerson || '',
            type: store.type || '',
            size: store.size || '',
            securityGate: store.securityGate || '',
            address: store.address || '',
            status: store.status || 'Active',
            description: store.description || ''
          });
        }
      } catch (error) {
        console.error('Error fetching store:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [params.id]);

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
    setSaving(true);

    try {
      const response = await fetch(`/api/stores/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: params.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update store');
      }

      router.push('/stores');
    } catch (error) {
      console.error('Error updating store:', error);
      // Handle error (you might want to show an error message to the user)
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BuildingStorefrontIcon className="w-6 h-6 text-gray-500" />
                <h1 className="text-xl font-semibold text-gray-900">Edit Store</h1>
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

              {/* Store Code */}
              <div className="space-y-1">
                <label htmlFor="storeCode" className="block text-sm font-medium text-gray-700">
                  Store Code
                </label>
                <input
                  type="text"
                  id="storeCode"
                  name="storeCode"
                  value={formData.storeCode}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="e.g., NYC-DT-001"
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

              {/* Contact Person */}
              <div className="space-y-1">
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                  Contact Person
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Enter contact person name"
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

              {/* Security Gate */}
              <div className="space-y-1">
                <label htmlFor="securityGate" className="block text-sm font-medium text-gray-700">
                  Security Gate
                </label>
                <select
                  id="securityGate"
                  name="securityGate"
                  value={formData.securityGate}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="">Select security level</option>
                  {securityGates.map(level => (
                    <option key={level} value={level}>
                      {level}
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
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 