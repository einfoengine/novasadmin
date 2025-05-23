"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

interface Item {
  id: string;
  name: string;
  image: string;
  size: number[];
  materials: string[];
  'printer-ids': string[];
  'finisher-ids': string[];
  'others-ids': string[];
  lamination: string[];
  description: string;
  [key: string]: string | number[] | string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  items: Item[];
}

interface Material {
  id: string;
  name: string;
  type: string;
}

interface DropdownProps {
  label: string;
  options: Material[];
  selected: string[];
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, onChange, className = '' }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selected.includes(value)) {
      onChange(value);
    }
    // Reset the select to the first option
    e.target.value = '';
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value=""
        onChange={handleSelectChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            disabled={selected.includes(option.id)}
          >
            {option.name}
          </option>
        ))}
      </select>
      
      {/* Selected Items List */}
      {selected.length > 0 && (
        <div className="mt-2 space-y-1">
          {selected.map(id => {
            const option = options.find(opt => opt.id === id);
            return (
              <div key={id} className="flex items-center justify-between bg-gray-50 px-3 py-1 rounded-md">
                <span className="text-sm text-gray-700">{option?.name || id}</span>
                <button
                  type="button"
                  onClick={() => onChange(id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function NewProductPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [printers, setPrinters] = useState<Material[]>([]);
  const [finishers, setFinishers] = useState<Material[]>([]);
  const [others, setOthers] = useState<Material[]>([]);
  const [product, setProduct] = useState<Product>({
    id: `PKG${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    name: '',
    description: '',
    price: 0,
    items: []
  });

  const [itemBoxes, setItemBoxes] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all required data
        const [materialsResponse, printersResponse, finishersResponse, othersResponse] = await Promise.all([
          fetch('/data/materials.json'),
          fetch('/data/printers.json'),
          fetch('/data/finishers.json'),
          fetch('/data/others.json')
        ]);
        
        const materialsData = await materialsResponse.json();
        const printersData = await printersResponse.json();
        const finishersData = await finishersResponse.json();
        const othersData = await othersResponse.json();

        // Set the data with proper names
        setMaterials(materialsData.materials.map((m: Material) => ({ ...m, type: 'material' })));
        setPrinters(printersData.printers.map((p: Material) => ({ ...p, type: 'printer' })));
        setFinishers(finishersData.finishers.map((f: Material) => ({ ...f, type: 'finisher' })));
        setOthers(othersData.others.map((o: Material) => ({ ...o, type: 'other' })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemBoxes(prev => {
      const newBoxes = [...prev];
      newBoxes[index] = {
        ...newBoxes[index],
        [name]: value
      };
      return newBoxes;
    });
  };

  const handleSizeChange = (index: number, sizeIndex: number, value: string) => {
    setItemBoxes(prev => {
      const newBoxes = [...prev];
      const newSize = [...newBoxes[index].size];
      newSize[sizeIndex] = parseInt(value) || 0;
      newBoxes[index] = {
        ...newBoxes[index],
        size: newSize
      };
      return newBoxes;
    });
  };

  const handleImageUpload = (index: number, imageUrl: string) => {
    setItemBoxes(prev => {
      const newBoxes = [...prev];
      newBoxes[index] = {
        ...newBoxes[index],
        image: imageUrl
      };
      return newBoxes;
    });
  };

  const handleMultiSelect = (index: number, field: keyof Item, value: string) => {
    setItemBoxes(prev => {
      const newBoxes = [...prev];
      const currentValues = newBoxes[index][field] as string[];
      newBoxes[index] = {
        ...newBoxes[index],
        [field]: currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
      return newBoxes;
    });
  };

  const addItemBox = () => {
    const newItem: Item = {
      id: `PRD${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: '',
      image: '',
      size: [0, 0],
      materials: [],
      'printer-ids': [],
      'finisher-ids': [],
      'others-ids': [],
      lamination: [],
      description: ''
    };
    setItemBoxes(prev => [...prev, newItem]);
  };

  const removeItemBox = (index: number) => {
    setItemBoxes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Filter out incomplete items
      const validItems = itemBoxes.filter(item => item.name && item.description);
      const updatedProduct = {
        ...product,
        items: validItems
      };
      // Here you would typically make an API call to save the product
      console.log('Saving product:', updatedProduct);
      router.push('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleProductChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleProductChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleProductChange}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Item Boxes */}
        <div className="space-y-6">
          {itemBoxes.map((item, index) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Item {index + 1}</h2>
                <button
                  type="button"
                  onClick={() => removeItemBox(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Size (Width x Height)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={item.size[0]}
                      onChange={(e) => handleSizeChange(index, 0, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="Width"
                    />
                    <input
                      type="number"
                      value={item.size[1]}
                      onChange={(e) => handleSizeChange(index, 1, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="Height"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <Dropdown
                    label="Materials"
                    options={materials}
                    selected={item.materials}
                    onChange={(value) => handleMultiSelect(index, 'materials', value)}
                  />
                </div>
                <div>
                  <Dropdown
                    label="Printers"
                    options={printers}
                    selected={item['printer-ids']}
                    onChange={(value) => handleMultiSelect(index, 'printer-ids', value)}
                  />
                </div>
                <div>
                  <Dropdown
                    label="Finishers"
                    options={finishers}
                    selected={item['finisher-ids']}
                    onChange={(value) => handleMultiSelect(index, 'finisher-ids', value)}
                  />
                </div>
                <div>
                  <Dropdown
                    label="Others"
                    options={others}
                    selected={item['others-ids']}
                    onChange={(value) => handleMultiSelect(index, 'others-ids', value)}
                  />
                </div>
                <div>
                  <Dropdown
                    label="Lamination"
                    options={[
                      { id: 'glossy', name: 'Glossy', type: 'lamination' },
                      { id: 'matte', name: 'Matte', type: 'lamination' },
                      { id: 'soft-touch', name: 'Soft Touch', type: 'lamination' },
                      { id: 'spot-uv', name: 'Spot UV', type: 'lamination' },
                      { id: 'uv-protected', name: 'UV Protected', type: 'lamination' },
                      { id: 'anti-scratch', name: 'Anti-Scratch', type: 'lamination' },
                      { id: 'weather-resistant', name: 'Weather Resistant', type: 'lamination' }
                    ]}
                    selected={item.lamination}
                    onChange={(value) => handleMultiSelect(index, 'lamination', value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <ImageUpload
                    value={item.image}
                    onChange={(url) => handleImageUpload(index, url)}
                    label="Image"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={addItemBox}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Item
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
} 