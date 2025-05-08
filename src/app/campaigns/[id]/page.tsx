"use client";

import { useEffect, useState } from "react";


interface Campaign {
  id: string;
  campaignName: string;
  campaignDescription: string;
  startDate: string;
  endDate: string;
  countries: string[];
  storeCodes: string[];
  selectedProducts: {
    productId: string;
    quantity: number;
  }[];
  totalCost: number;
  createdAt: string;
}

export default function CampaignSummary() {
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get campaign data from localStorage
    const campaignData = localStorage.getItem('currentCampaign');
    if (campaignData) {
      setCampaign(JSON.parse(campaignData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
            <p className="text-gray-600">The campaign you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{campaign.campaignName}</h1>
            <p className="text-sm text-gray-500">Created on {new Date(campaign.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Campaign Details */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600">{campaign.campaignDescription}</p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Start Date</h2>
                <p className="text-gray-600">{new Date(campaign.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">End Date</h2>
                <p className="text-gray-600">{new Date(campaign.endDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Total Cost */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Total Cost</h2>
              <p className="text-2xl font-bold text-green-600">${campaign.totalCost.toFixed(2)}</p>
            </div>

            {/* Countries */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Selected Countries</h2>
              <div className="flex flex-wrap gap-2">
                {campaign.countries.map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>

            {/* Stores */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Selected Stores</h2>
              <div className="flex flex-wrap gap-2">
                {campaign.storeCodes.map((store) => (
                  <span
                    key={store}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {store}
                  </span>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Selected Products</h2>
              <div className="space-y-2">
                {campaign.selectedProducts.map((product) => (
                  <div
                    key={product.productId}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-800">{product.productId}</span>
                    <span className="text-gray-600">Quantity: {product.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 