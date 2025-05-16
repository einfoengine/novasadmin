"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/StatsCard";
import { ArrowTrendingUpIcon, ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="nt-dashboard-main-content w-full">
        <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard 
              title="Last Modified" 
              value="2 hours ago" 
              icon={<ClockIcon className="w-6 h-6" />} 
              iconColor="#6366f1" 
              iconBg="#eef2ff" 
              percentage="" 
              percentageColor="#6b7280" 
              trend=""
            />
            
            <StatsCard
              title="New Products"
              value="12"
              icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
              iconColor="#10b981"
              iconBg="#ecfdf5"
              percentage="15%"
              percentageColor="#10b981"
              trend="Increased by"
            />

            <StatsCard
              title="Invoice Status"
              value="Pending"
              icon={<DocumentTextIcon className="w-6 h-6" />}
              iconColor="#f59e42"
              iconBg="#fff7ed"
              percentage="5"
              percentageColor="#f59e42"
              trend="invoices"
            />
          </div>

          {/* Products Table */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Products</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all products in your inventory including their details.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add Product
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            ID
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Size
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Material
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Channel
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Machine
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Surface
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Die Mood
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Gluing
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Finishing
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Price
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Stock
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {product.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.size}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.material}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.channel}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.machine}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.surface}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.dieMood}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.gluing}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.finishing}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.stock}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                product.status === 'In Stock' 
                                  ? 'bg-green-100 text-green-800'
                                  : product.status === 'Low Stock'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}