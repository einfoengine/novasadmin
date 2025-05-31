'use client';

import React, { useEffect, useState } from 'react';

interface Store {
  id: string;
  name: string;
  address: string;
  countryId: string;
  storeCode: string;
}

interface CampaignProduct {
  productId: string;
  name: string;
  quantity: number;
}

interface Campaign {
  campaignId: string;
  campaignName: string;
  countryId: string;
  startDate: string;
  deadline: string;
  products: CampaignProduct[];
}

interface ProductDetails {
  id: string;
  name: string;
  image?: string;
}

export default function CountryDataSheetPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [productsMap, setProductsMap] = useState<Record<string, ProductDetails>>({});
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const [campaignsRes, storesRes, productsRes] = await Promise.all([
        fetch('/data/campaigns.json'),
        fetch('/data/stores.json'),
        fetch('/data/products.json')
      ]);
      const campaignsData = await campaignsRes.json();
      const storesData = await storesRes.json();
      const productsData = await productsRes.json();
      setCampaigns(campaignsData.campaigns);
      setStores(storesData.stores);
      // Build product map
      const map: Record<string, ProductDetails> = {};
      for (const pkg of productsData.products) {
        for (const item of pkg.items) {
          map[item.id] = { id: item.id, name: item.name, image: item.image };
        }
      }
      setProductsMap(map);
    };
    fetchData();
  }, []);

  // Get selected campaign and stores for the selected country
  const selectedCampaign = campaigns.find(c => c.campaignId === selectedCampaignId);
  const countryStores = stores.filter(s => s.countryId === selectedCountryId);

  // Get all product IDs for the selected campaign
  const productIds = selectedCampaign?.products.map(p => p.productId) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Campaign</label>
            <select
              className="border rounded px-3 py-2"
              value={selectedCampaignId}
              onChange={e => setSelectedCampaignId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {campaigns.map(c => (
                <option key={c.campaignId} value={c.campaignId}>{c.campaignName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Country</label>
            <select
              className="border rounded px-3 py-2"
              value={selectedCountryId}
              onChange={e => setSelectedCountryId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {[...new Set(stores.map(s => s.countryId))].map(cid => (
                <option key={cid} value={cid}>{cid}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedCampaign && selectedCountryId && (
          <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
            {/* Header */}
            <div className="mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{selectedCampaign.campaignName}</h1>
                  <div className="text-gray-600 text-sm">Start: {selectedCampaign.startDate} | Delivery: {selectedCampaign.deadline}</div>
                </div>
              </div>
            </div>
            {/* Table */}
            <table className="min-w-full border text-xs">
              <thead>
                <tr>
                  <th className="border px-2 py-1 bg-gray-100">Code</th>
                  <th className="border px-2 py-1 bg-gray-100">Store Address</th>
                  {/* Product columns with images */}
                  {productIds.map(pid => (
                    <th key={pid} className="border px-2 py-1 bg-gray-100 min-w-[120px]">
                      {productsMap[pid]?.image && (
                        <img src={productsMap[pid].image} alt={productsMap[pid].name} className="h-10 mx-auto mb-1" />
                      )}
                      <div className="font-semibold text-gray-700 text-xs text-center">{productsMap[pid]?.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {countryStores.map(store => (
                  <tr key={store.id}>
                    <td className="border px-2 py-1 font-mono text-xs">{store.storeCode}</td>
                    <td className="border px-2 py-1">{store.name} <br /><span className="text-gray-400 text-xs">{store.address}</span></td>
                    {productIds.map(pid => (
                      <td key={pid} className="border px-2 py-1 text-center">
                        {/* For demo, just show the campaign product quantity. In real, this should be per store/product. */}
                        {selectedCampaign.products.find(p => p.productId === pid)?.quantity || ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 