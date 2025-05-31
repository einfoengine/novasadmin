'use client';

import { useEffect, useState } from "react";

interface CampaignProduct {
  productId: string;
  name: string;
  quantity: number;
}

interface Campaign {
  campaignId: string;
  campaignName: string;
  countryId: string;
  assignUserId: string;
  typeOfOrder: string;
  productType: string;
  assignDate: string;
  startDate: string;
  deadline: string;
  status: string;
  totalCosts: number;
  currency: string;
  invoiceStatus: string;
  products: CampaignProduct[];
}

interface ProductDetails {
  id: string;
  name: string;
  image?: string;
  description?: string;
}

export default function CampaignDetailsClient({ id }: { id: string }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [productsMap, setProductsMap] = useState<Record<string, ProductDetails>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignsRes, productsRes] = await Promise.all([
          fetch('/data/campaigns.json'),
          fetch('/data/products.json')
        ]);
        const campaignsData = await campaignsRes.json();
        const productsData = await productsRes.json();
        const found = campaignsData.campaigns.find((c: Campaign) => c.campaignId === id);
        setCampaign(found || null);
        // Build a map of productId -> details
        const map: Record<string, ProductDetails> = {};
        for (const pkg of productsData.products) {
          for (const item of pkg.items) {
            map[item.id] = {
              id: item.id,
              name: item.name,
              image: item.image,
              description: item.description
            };
          }
        }
        setProductsMap(map);
      } catch {
        setCampaign(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
            <p className="text-gray-600">The campaign you are looking for does not exist.</p>
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
            <p className="text-sm text-gray-500">Start: {new Date(campaign.startDate).toLocaleDateString()} | End: {new Date(campaign.deadline).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Status: {campaign.status}</p>
            <p className="text-sm text-gray-500">Invoice Status: {campaign.invoiceStatus}</p>
          </div>

          {/* Campaign Details */}
          <div className="p-6 space-y-6">
            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Country ID</h2>
                <p className="text-gray-600">{campaign.countryId}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Assigned User ID</h2>
                <p className="text-gray-600">{campaign.assignUserId}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Type of Order</h2>
                <p className="text-gray-600">{campaign.typeOfOrder}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Product Type</h2>
                <p className="text-gray-600">{campaign.productType}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Total Cost</h2>
                <p className="text-2xl font-bold text-green-600">{campaign.totalCosts} {campaign.currency}</p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Products</h2>
              <div className="space-y-4">
                {campaign.products && campaign.products.length > 0 ? (
                  campaign.products.map((product) => {
                    const details = productsMap[product.productId];
                    return (
                      <div key={product.productId} className="flex gap-4 items-center bg-gray-50 rounded-lg p-4">
                        {details?.image && (
                          <img src={details.image} alt={details.name} className="w-20 h-20 object-cover rounded border" />
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">{details?.name || product.name}</div>
                          <div className="text-gray-500 text-sm">{details?.description}</div>
                          <div className="mt-1 text-gray-700">Quantity: <span className="font-bold">{product.quantity}</span></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-gray-500">No products for this campaign.</div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 