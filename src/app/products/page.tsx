"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowTrendingUpIcon, ClockIcon, DocumentTextIcon, CubeIcon } from '@heroicons/react/24/outline';
import TableGroups from '@/components/TableGroups';
import StatsCard from "@/components/StatsCard";

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

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

  const handleEdit = (item: Item) => {
    router.push(`/products/${item.id}`);
  };

  const handleDelete = async (ids: string[]) => {
    if (window.confirm(`Are you sure you want to delete ${ids.length} items?`)) {
      // Here you would typically make an API call to delete the items
      // For now, we'll just update the local state
      setProducts(prevProducts => 
        prevProducts.map(product => ({
          ...product,
          items: product.items.filter(item => !ids.includes(item.id))
        })).filter(product => product.items.length > 0)
      );
    }
  };

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'size', label: 'Size', render: (item: Item) => `${item.size[0]} x ${item.size[1]}` },
    { key: 'materials', label: 'Materials', render: (item: Item) => item.materials.join(', ') },
    { key: 'printer-ids', label: 'Printers', render: (item: Item) => item['printer-ids'].join(', ') },
    { key: 'finisher-ids', label: 'Finishers', render: (item: Item) => item['finisher-ids'].join(', ') },
    { key: 'others-ids', label: 'Others', render: (item: Item) => item['others-ids'].join(', ') },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Products"
          value={products.reduce((acc, p) => acc + p.items.length, 0).toString()}
          icon={<CubeIcon className="w-6 h-6" />}
          iconColor="#3b82f6"
          iconBg="#eff6ff"
          percentage=""
          percentageColor="#6b7280"
          trend=""
        />
        <StatsCard
          title="Total Packages"
          value={products.length.toString()}
          icon={<DocumentTextIcon className="w-6 h-6" />}
          iconColor="#8b5cf6"
          iconBg="#f5f3ff"
          percentage=""
          percentageColor="#6b7280"
          trend=""
        />
        <StatsCard
          title="Average Price"
          value={`$${(products.reduce((acc, p) => acc + p.price, 0) / products.length).toFixed(2)}`}
          icon={<ClockIcon className="w-6 h-6" />}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          percentage=""
          percentageColor="#6b7280"
          trend=""
        />
        <StatsCard
          title="Total Value"
          value={`$${products.reduce((acc, p) => acc + p.price, 0).toFixed(2)}`}
          icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
          iconColor="#f59e42"
          iconBg="#fff7ed"
          percentage=""
          percentageColor="#6b7280"
          trend=""
        />
      </div>

      <div className="rounded-lg shadow">
        <TableGroups
          data={products}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actionButton={{
            label: 'Add Product',
            href: '/products/new'
          }}
        />
      </div>
    </div>
  );
}