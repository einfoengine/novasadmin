"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/providers';
import { ArrowTrendingUpIcon, ClockIcon, DocumentTextIcon, CubeIcon } from '@heroicons/react/24/outline';
import TableBuilder from '@/components/TableBuilder';
import StatsCard from "@/components/StatsCard";

interface Product {
  id: string;
  name: string;
  image: string;
  size: string;
  material: string;
  channel: string;
  machine: string;
  surface: string;
  dieMood: string;
  gluing: string;
  finishing: string;
  price: number;
  stock: number;
  status: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRowClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleEdit = (product: Product) => {
    router.push(`/products/${product.id}/edit`);
  };

  const handleDelete = (product: Product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== product.id));
    }
  };

  const columns = [
    { 
      key: 'id', 
      label: 'ID',
      className: ''
    },
    { 
      key: 'name', 
      label: 'Product Name',
      type: 'link' as const,
      linkHref: (value: unknown) => `/products/${value}`,
      className: ''
    },
    { 
      key: 'size', 
      label: 'Size',
      className: ''
    },
    { 
      key: 'material', 
      label: 'Material',
      className: ''
    },
    { 
      key: 'channel', 
      label: 'Channel',
      className: ''
    },
    { 
      key: 'machine', 
      label: 'Machine',
      className: ''
    },
    { 
      key: 'surface', 
      label: 'Surface',
      className: ''
    },
    { 
      key: 'dieMood', 
      label: 'Die Mood',
      className: ''
    },
    { 
      key: 'gluing', 
      label: 'Gluing',
      className: ''
    },
    { 
      key: 'finishing', 
      label: 'Finishing',
      className: ''
    },
    { 
      key: 'price', 
      label: 'Price',
      type: 'currency' as const,
      className: ''
    },
    { 
      key: 'stock', 
      label: 'Stock',
      type: 'number' as const,
      className: ''
    },
    { 
      key: 'status', 
      label: 'Status',
      type: 'status' as const,
      className: ''
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Total Products"
          value={products.length.toString()}
          icon={<DocumentTextIcon className="w-6 h-6" />}
          iconColor="#6366f1"
          iconBg="#eef2ff"
          percentage=""
          percentageColor="#6b7280"
          trend="+12%"
        />
        <StatsCard
          title="Low Stock Items"
          value={products.filter(p => p.status === "Low Stock").length.toString()}
          icon={<ClockIcon className="w-6 h-6" />}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          percentage=""
          percentageColor="#6b7280"
          trend="-5%"
        />
        <StatsCard
          title="Out of Stock"
          value={products.filter(p => p.status === "Out of Stock").length.toString()}
          icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
          iconColor="#f59e42"
          iconBg="#fff7ed"
          percentage=""
          percentageColor="#6b7280"
          trend="+2%"
        />
      </div>

      <div className={`rounded-lg shadow`}>
        <TableBuilder
          data={products}
          columns={columns}
          title="Products"
          icon={<CubeIcon className={`h-6 w-6 `} />}
          searchable
          selectable
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actionButton={{
            label: 'Add Product',
            href: '/products/new',
          }}
        />
      </div>
    </div>
  );
}