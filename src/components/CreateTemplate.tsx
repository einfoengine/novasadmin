'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

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

interface SelectedProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  description: string;
}

export default function CreateTemplate() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [selectedProductDetails, setSelectedProductDetails] = useState<SelectedProduct | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    if (!productId) return;

    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if product is already selected
    if (selectedProducts.some(p => p.id === productId)) {
      return;
    }

    const newProduct = {
      id: product.id,
      name: product.name,
      quantity: 1,
      price: product.price,
      image: product.items[0]?.image || '/placeholder.png',
      description: product.description
    };

    setSelectedProducts(prev => [...prev, newProduct]);
    setSelectedProductDetails(newProduct);
    e.target.value = ''; // Reset select
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, quantity } : p)
    );
    if (selectedProductDetails?.id === productId) {
      setSelectedProductDetails(prev => prev ? { ...prev, quantity } : null);
    }
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    if (selectedProductDetails?.id === productId) {
      setSelectedProductDetails(null);
    }
  };

  const handleProductClick = (product: SelectedProduct) => {
    setSelectedProductDetails(product);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement template creation logic
    console.log('Template data:', {
      ...formData,
      products: selectedProducts
    });
    router.push('/templates');
  };

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
          <h1 className="text-2xl font-semibold">Create Template</h1>
        </div>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Left Panel - Form */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Template Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              {/* Product Selection */}
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-700">
                  Add Products
                </label>
                <select
                  id="product"
                  onChange={handleProductSelect}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="">Select a product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Products Table */}
              {selectedProducts.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Products</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedProducts.map(product => (
                        <tr 
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className={`hover:bg-gray-50 cursor-pointer ${selectedProductDetails?.id === product.id ? 'bg-gray-50' : ''}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${product.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={product.quantity}
                              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                              onClick={(e) => e.stopPropagation()}
                              className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeProduct(product.id);
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Create Template
              </button>
            </div>
          </div>

          {/* Right Panel - Product Details */}
          <div className="w-96 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
            {selectedProductDetails ? (
              <div className="space-y-6">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                  <Image
                    src={selectedProductDetails.image}
                    alt={selectedProductDetails.name}
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{selectedProductDetails.name}</h4>
                  <p className="mt-1 text-sm text-gray-600">{selectedProductDetails.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Price</h4>
                    <p className="mt-1 text-sm text-gray-600">${selectedProductDetails.price}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Quantity</h4>
                    <p className="mt-1 text-sm text-gray-600">{selectedProductDetails.quantity}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Select a product to view details</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
} 