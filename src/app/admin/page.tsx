"use client";

import { useState, useEffect } from "react";
import { PlusIcon, ShoppingCartIcon, CubeIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Campaign {
  campaignId: string;
  campaignName: string;
  startDate: string;
  endDate: string;
  status: string;
  totalCost: number;
}

interface Stats {
  totalOrders: number;
  totalProducts: number;
  totalStores: number;
}

export default function AdminPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalProducts: 0,
    totalStores: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignsRes, ordersRes, productsRes, storesRes] = await Promise.all([
          fetch('/campaigns.json'),
          fetch('/orders.json'),
          fetch('/products.json'),
          fetch('/stores.json')
        ]);

        const campaignsData = await campaignsRes.json();
        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();
        const storesData = await storesRes.json();

        setCampaigns(campaignsData.campaigns);
        setStats({
          totalOrders: ordersData.orders.length,
          totalProducts: productsData.products.length,
          totalStores: storesData.stores.length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Orders Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <ShoppingCartIcon className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/orders/add"
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add New Order
              </Link>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <CubeIcon className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/products/add"
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add New Product
              </Link>
            </div>
          </div>

          {/* Stores Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Stores</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalStores}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <BuildingStorefrontIcon className="h-6 w-6 text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/stores/add"
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add New Store
              </Link>
            </div>
          </div>
        </div>

        {/* Campaigns Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Campaigns</h2>
              <Link
                href="/campaigns/add-campaign"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Add New Campaign
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Cost
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.campaignId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.campaignId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.campaignName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        campaign.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${campaign.totalCost.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 