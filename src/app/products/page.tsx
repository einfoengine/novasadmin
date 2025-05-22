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
  size: number[];
  materials: string[];
  "printer-ids": string[];
  "finisher-ids": string[];
  "others-ids": string[];
  surface: string;
  lamination: string;
  pricing: number;
  description: string;
}

interface Material {
  id: string;
  name: string;
  materialSegment: string;
  materialType: string;
  description: string;
  size: string;
  color: string;
  price: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, materialsResponse] = await Promise.all([
          fetch('/data/products.json'),
          fetch('/data/materials.json')
        ]);
        const productsData = await productsResponse.json();
        const materialsData = await materialsResponse.json();
        setProducts(productsData.products || []);
        setMaterials(materialsData.materials || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setProducts([]);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const getMaterialNames = (materialIds: string[]): React.ReactNode => {
    return (
      <div className="flex flex-wrap gap-1">
        {materialIds.map(id => {
          const material = materials.find(m => m.id === id);
          return (
            <span 
              key={id}
              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
            >
              {material ? material.name : id}
            </span>
          );
        })}
      </div>
    );
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
      key: 'image', 
      label: 'Image',
      type: 'image' as const,
      className: ''
    },
    { 
      key: 'name', 
      label: 'Name',
      className: 'font-medium hover:text-primary cursor-pointer'
    },
    { 
      key: 'size', 
      label: 'Size',
      render: (item: Product) => `${item.size[0]} x ${item.size[1]}`
    },
    { 
      key: 'materials', 
      label: 'Material',
      render: (item: Product) => getMaterialNames(item.materials)
    },
    { 
      key: 'printer-ids', 
      label: 'Printing',
      render: (item: Product) => getMaterialNames(item["printer-ids"])
    },
    { 
      key: 'surface', 
      label: 'Surface',
      type: 'text' as const,
      className: 'text-center'
    },
    { 
      key: 'lamination', 
      label: 'Lamination',
      type: 'text' as const,
      className: 'text-center'
    },
    { 
      key: 'finisher-ids', 
      label: 'Finishing',
      render: (item: Product) => getMaterialNames(item["finisher-ids"])
    },
    { 
      key: 'others-ids', 
      label: 'Others',
      render: (item: Product) => getMaterialNames(item["others-ids"])
    },
    { 
      key: 'pricing', 
      label: 'Pricing',
      type: 'currency' as const,
      className: ''
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