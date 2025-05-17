'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';

interface SelectedProduct {
  productId: string;
  quantity: number;
}

export default function CampaignSummaryPage() {
  const router = useRouter();
  const campaign = useSelector((state: RootState) => state.campaign.currentCampaign);

  useEffect(() => {
    if (!campaign) {
      router.push('/campaigns/add-campaign');
    }
  }, [campaign, router]);

  if (!campaign) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Campaign Summary</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Campaign Details</h2>
                  <dl className="mt-2 space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Campaign Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{campaign.campaignName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Description</dt>
                      <dd className="mt-1 text-sm text-gray-900">{campaign.campaignDescription}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{new Date(campaign.startDate).toLocaleDateString()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">End Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{new Date(campaign.endDate).toLocaleDateString()}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-gray-900">Selected Countries</h2>
                  <ul className="mt-2 space-y-2">
                    {campaign.countries.map((countryId: string) => (
                      <li key={countryId} className="text-sm text-gray-900">
                        {countryId}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-gray-900">Selected Stores</h2>
                  <ul className="mt-2 space-y-2">
                    {campaign.storeCodes.map((storeId: string) => (
                      <li key={storeId} className="text-sm text-gray-900">
                        {storeId}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Selected Products</h2>
                  <div className="mt-2 space-y-4">
                    {campaign.selectedProducts.map((item: SelectedProduct) => (
                      <div key={item.productId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-16 h-16 relative">
                          <Image
                            src="/images/products/placeholder.jpg"
                            alt="Product"
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">Product ID: {item.productId}</h3>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h2 className="text-lg font-medium text-gray-900">Total Cost</h2>
                  <p className="mt-2 text-2xl font-bold text-gray-900">${campaign.totalCost.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 