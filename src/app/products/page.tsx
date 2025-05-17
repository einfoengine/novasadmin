"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowTrendingUpIcon, ClockIcon, DocumentTextIcon, CubeIcon } from '@heroicons/react/24/outline';
import TableBuilder from '@/components/TableBuilder';
import StatsCard from "@/components/StatsCard";

interface Product {
  id: string;
  name: string;
  image: string;
  size: string;
  material: string;
  printing: string;
  surface: string;
  lamination: string;
  finishing: string;
  pricing: number;
  description: string;
}

export default function ProductsPage() {
  const router = useRouter();
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
      key: 'name', 
      label: 'Name',
      className: 'font-medium hover:text-primary cursor-pointer'
    },
    { 
      key: 'image', 
      label: 'Image',
      type: 'image' as const,
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
      key: 'printing', 
      label: 'Printing',
      className: ''
    },
    { 
      key: 'surface', 
      label: 'Surface',
      className: ''
    },
    { 
      key: 'lamination', 
      label: 'Lamination',
      className: ''
    },
    { 
      key: 'finishing', 
      label: 'Finishing',
      className: ''
    },
    { 
      key: 'pricing', 
      label: 'Pricing',
      type: 'currency' as const,
      className: ''
    },
    { 
      key: 'description', 
      label: 'Description',
      className: 'max-w-xs truncate'
    }
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
          title="Average Price"
          value={`$${(products.reduce((acc, p) => acc + p.pricing, 0) / products.length).toFixed(2)}`}
          icon={<ClockIcon className="w-6 h-6" />}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          percentage=""
          percentageColor="#6b7280"
          trend="-5%"
        />
        <StatsCard
          title="Total Value"
          value={`$${products.reduce((acc, p) => acc + p.pricing, 0).toFixed(2)}`}
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
          onRowClick={(product) => router.push(`/products/${product.id}`)}
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