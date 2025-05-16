"use client";

import { useState } from "react";
import StatsCard from "@/components/StatsCard";
import { ArrowTrendingUpIcon, ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Product {
  id: number;
  image: string | null;
  name: string | null;
  size: string | null;
  material: string | null;
  channel: string | null;
  machine: string | null;
  surface: string | null;
  dieMood: string | null;
  gluing: string | null;
  finishing: string | null;
  price: string | null;
}

const demoProducts: Product[] = [
  {
    id: 1,
    image: "/images/products/demo1.jpg",
    name: "Custom Box",
    size: "30x20x10cm",
    material: "Cardboard",
    channel: "Single Wall",
    machine: "Heidelberg",
    surface: "Matte",
    dieMood: "Standard",
    gluing: "Hotmelt",
    finishing: "Gloss",
    price: "$2.50",
  },
  {
    id: 2,
    image: "/images/products/demo2.jpg",
    name: "Gift Bag",
    size: "25x15x8cm",
    material: "Paper",
    channel: "N/A",
    machine: "Komori",
    surface: "Glossy",
    dieMood: "Custom",
    gluing: "Manual",
    finishing: "Foil",
    price: "$1.20",
  },
  {
    id: 3,
    image: "/images/products/demo3.jpg",
    name: "Label Sticker",
    size: "10x5cm",
    material: "Vinyl",
    channel: "N/A",
    machine: "HP Indigo",
    surface: "Glossy",
    dieMood: "None",
    gluing: "Self-adhesive",
    finishing: "UV",
    price: "$0.10",
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // Filtered products by search
  const filteredProducts = demoProducts.filter((p) => {
    const name = p.name || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Last Modified" value="-" icon={<ClockIcon className="h-6 w-6" />} iconColor="#6366f1" iconBg="#eef2ff" percentage="-" percentageColor="#6b7280" trend="" />
        <StatsCard title="New Products" value="-" icon={<ArrowTrendingUpIcon className="h-6 w-6" />} iconColor="#10b981" iconBg="#ecfdf5" percentage="-" percentageColor="#6b7280" trend="" />
        <StatsCard title="Invoice Status" value="-" icon={<DocumentTextIcon className="h-6 w-6" />} iconColor="#f59e42" iconBg="#fff7ed" percentage="-" percentageColor="#6b7280" trend="" />
      </div>
      
      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        {/* Products Table Title */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Products <span className="text-base font-normal text-gray-500">({filteredProducts.length} products)</span></h1>
      </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2">
          <label className="text-sm">Show</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm">products</span>
        </div>
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search products..."
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm w-full max-w-xs"
          />
          <button
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 text-sm flex items-center gap-1 whitespace-nowrap"
            onClick={() => window.location.href = '/products/add'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Product
          </button>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-[900px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Type of Material</th>
              <th className="px-4 py-3">Printing Channel</th>
              <th className="px-4 py-3">Printing Machine</th>
              <th className="px-4 py-3">Printing Surface</th>
              <th className="px-4 py-3">Die Mood</th>
              <th className="px-4 py-3">Gluing</th>
              <th className="px-4 py-3">Finishing</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 text-center">
                  {product.image ? (
                    <Image src={product.image} alt={product.name || "Product"} width={48} height={48} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded" />
                  )}
                </td>
                <td className="px-4 py-2 text-center">{product.name || '-'}</td>
                <td className="px-4 py-2 text-center">{product.size || '-'}</td>
                <td className="px-4 py-2 text-center">{product.material || '-'}</td>
                <td className="px-4 py-2 text-center">{product.channel || '-'}</td>
                <td className="px-4 py-2 text-center">{product.machine || '-'}</td>
                <td className="px-4 py-2 text-center">{product.surface || '-'}</td>
                <td className="px-4 py-2 text-center">{product.dieMood || '-'}</td>
                <td className="px-4 py-2 text-center">{product.gluing || '-'}</td>
                <td className="px-4 py-2 text-center">{product.finishing || '-'}</td>
                <td className="px-4 py-2 text-center">{product.price || '-'}</td>
                <td className="px-4 py-2 text-center flex items-center justify-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182L7.5 20.213l-4.182 1 1-4.182 12.544-12.544z" />
                    </svg>
                  </button>
                  <button className="text-red-600 hover:text-red-800" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}