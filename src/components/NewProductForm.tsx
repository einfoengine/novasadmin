"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
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

export default function NewProductForm() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [printers, setPrinters] = useState<Material[]>([]);
  const [finishers, setFinishers] = useState<Material[]>([]);
  const [others, setOthers] = useState<Material[]>([]);
  const [product, setProduct] = useState<Product>({
    id: 'PKG001',
    name: '',
    description: '',
    price: 0,
    items: []
  });

  const [itemBoxes, setItemBoxes] = useState<Item[]>([]);
  const [itemCounter, setItemCounter] = useState(1);

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
      id: `PRD${itemCounter.toString().padStart(3, '0')}`,
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
    setItemCounter(prev => prev + 1);
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product.name}
                  onChange={handleProductChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={handleProductChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={product.description}
                  onChange={handleProductChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Items</h2>
          <button
            type="button"
            onClick={addItemBox}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Item
          </button>
        </div>

        {itemBoxes.map((item, index) => (
          <div key={item.id} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-900">Item {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeItemBox(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor={`item-name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                  Item Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id={`item-name-${index}`}
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor={`item-description-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id={`item-description-${index}`}
                    name="description"
                    rows={3}
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Size (mm)
                </label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={item.size[0]}
                    onChange={(e) => handleSizeChange(index, 0, e.target.value)}
                    placeholder="Width"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                  <input
                    type="number"
                    value={item.size[1]}
                    onChange={(e) => handleSizeChange(index, 1, e.target.value)}
                    placeholder="Height"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <ImageUpload
                  value={item.image}
                  onChange={(url) => handleImageUpload(index, url)}
                  label="Image"
                />
              </div>

              <div className="sm:col-span-3">
                <Dropdown
                  label="Materials"
                  options={materials}
                  selected={item.materials}
                  onChange={(value) => handleMultiSelect(index, 'materials', value)}
                />
              </div>

              <div className="sm:col-span-3">
                <Dropdown
                  label="Printers"
                  options={printers}
                  selected={item['printer-ids']}
                  onChange={(value) => handleMultiSelect(index, 'printer-ids', value)}
                />
              </div>

              <div className="sm:col-span-3">
                <Dropdown
                  label="Finishers"
                  options={finishers}
                  selected={item['finisher-ids']}
                  onChange={(value) => handleMultiSelect(index, 'finisher-ids', value)}
                />
              </div>

              <div className="sm:col-span-3">
                <Dropdown
                  label="Others"
                  options={others}
                  selected={item['others-ids']}
                  onChange={(value) => handleMultiSelect(index, 'others-ids', value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href="/products"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}