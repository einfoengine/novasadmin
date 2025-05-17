"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Material {
  id: string;
  name: string;
  materialSegment: string;
  description: string;
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

export default function NewProductPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    size: '',
    material: [],
    printing: [],
    surface: '',
    lamination: '',
    finishing: '',
    pricing: 0,
    description: '',
    image: ''
  });

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('/data/materisls.json');
        const data = await response.json();
        setMaterials(data.materials || []);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pricing' ? parseFloat(value) || 0 : value
    }));
  };

  const handleMultiSelect = (name: 'material' | 'printing', value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const removeSelectedItem = (name: 'material' | 'printing', value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement product creation logic
    console.log('Form submitted:', formData);
  };

  // Filter materials by segment
  const rollMaterials = materials.filter(m => m.materialSegment === 'roll');
  const sheetMaterials = materials.filter(m => m.materialSegment === 'sheet');
  const printerMaterials = materials.filter(m => m.materialSegment === 'printer');
  const finisherMaterials = materials.filter(m => m.materialSegment === 'finisher');

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <div className="space-y-2">
                  <select
                    name="material"
                    value=""
                    onChange={(e) => handleMultiSelect('material', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Material</option>
                    {rollMaterials.map(material => (
                      <option 
                        key={material.id} 
                        value={material.id}
                        disabled={formData.material.includes(material.id)}
                      >
                        {material.name}
                      </option>
                    ))}
                    {sheetMaterials.map(material => (
                      <option 
                        key={material.id} 
                        value={material.id}
                        disabled={formData.material.includes(material.id)}
                      >
                        {material.name}
                      </option>
                    ))}
                  </select>
                  {formData.material.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {formData.material.map(materialId => {
                        const material = materials.find(m => m.id === materialId);
                        return material ? (
                          <div 
                            key={materialId}
                            className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
                          >
                            <span className="text-sm">{material.name}</span>
                            <button
                              type="button"
                              onClick={() => removeSelectedItem('material', materialId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Printing
                </label>
                <div className="space-y-2">
                  <select
                    name="printing"
                    value=""
                    onChange={(e) => handleMultiSelect('printing', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Printer</option>
                    {printerMaterials.map(material => (
                      <option 
                        key={material.id} 
                        value={material.id}
                        disabled={formData.printing.includes(material.id)}
                      >
                        {material.name}
                      </option>
                    ))}
                  </select>
                  {formData.printing.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {formData.printing.map(printerId => {
                        const printer = materials.find(m => m.id === printerId);
                        return printer ? (
                          <div 
                            key={printerId}
                            className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
                          >
                            <span className="text-sm">{printer.name}</span>
                            <button
                              type="button"
                              onClick={() => removeSelectedItem('printing', printerId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface
                </label>
                <input
                  type="text"
                  name="surface"
                  value={formData.surface}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lamination
                </label>
                <input
                  type="text"
                  name="lamination"
                  value={formData.lamination}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Finishing
                </label>
                <select
                  name="finishing"
                  value={formData.finishing}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Finishing</option>
                  {finisherMaterials.map(material => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing
                </label>
                <input
                  type="number"
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>

        {/* Image Upload Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ImageUpload
              value={formData.image}
              onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
              onError={(error) => console.error(error)}
              label="Product Image"
              maxSize={2 * 1024 * 1024} // 2MB
              accept={['image/jpeg', 'image/png', 'image/webp']}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 