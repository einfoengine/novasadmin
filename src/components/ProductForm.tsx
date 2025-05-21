"use client";

import React, { useState, useEffect } from 'react';
import ImageUpload from '@/components/ImageUpload';

interface Material {
  id: string;
  name: string;
  materialSegment: string;
  materialType: string | null;
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
  quantity: number;
  pricing: number;
  description: string;
  image: string;
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function ProductForm({ 
  initialData = {}, 
  onSubmit, 
  onCancel,
  submitLabel = 'Create Product'
}: ProductFormProps) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [formData, setFormData] = useState<ProductFormData>(() => ({
    name: initialData.name || '',
    size: initialData.size || '',
    material: Array.isArray(initialData.material) ? initialData.material : [],
    printing: Array.isArray(initialData.printing) ? initialData.printing : [],
    surface: initialData.surface || '',
    lamination: initialData.lamination || '',
    finishing: initialData.finishing || '',
    quantity: initialData.quantity || 0,
    pricing: initialData.pricing || 0,
    description: initialData.description || '',
    image: initialData.image || ''
  }));

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('/data/materials.json');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
                  name="roll-sheet"
                  value=""
                  onChange={(e) => handleMultiSelect('material', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Material</option>
                  {materials
                    .filter(material => material.materialSegment === 'roll' || material.materialSegment === 'sheet')
                    .map(material => (
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
            {/*  */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Printer
              </label>
              <div className="space-y-2">
                <select
                  name="printer"
                  value=""
                  onChange={(e) => handleMultiSelect('material', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Printer</option>
                  {materials
                    .filter(material => material.materialSegment === 'printer')
                    .map(material => (
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
            {/*  */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Finisher
              </label>
              <div className="space-y-2">
                <select
                  name="finisher"
                  value=""
                  onChange={(e) => handleMultiSelect('printing', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Finisher</option>
                  {materials
                    .filter(material => material.materialSegment === 'finisher')
                    .map(material => (
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
            {/*  */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Others
              </label>
              <div className="space-y-2">
                <select
                  name="others"
                  value=""
                  onChange={(e) => handleMultiSelect('printing', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Others</option>
                  {materials
                    .filter(material => material.materialSegment === 'others')
                    .map(material => (
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
            {/*  */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
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
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {submitLabel}
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
  );
} 