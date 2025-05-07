'use client';

import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface StoreProduct {
  name: string;
  size: string;
  quantity: number;
}

interface Store {
  number: string;
  address: string;
  products: StoreProduct[];
}

export default function StoreBrief() {
  const [stores] = useState<Store[]>([
    {
      number: 'ST001',
      address: '123 Main Street, New York, NY 10001',
      products: [
        { name: 'BARBIE/HOT WHEELS', size: 'topper 100 x 70', quantity: 2 },
        { name: 'BARBIE/HOT WHEELS', size: 'Hanging wheel 68 cm', quantity: 1 },
        { name: 'DISNEY/MARVEL', size: '100 x 30 cm', quantity: 3 },
      ],
    },
    // Add more stores as needed
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/campaigns"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Campaigns
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Store Brief
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Detailed information about stores and their product allocations
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Store Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Store Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Products
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.map((store) => (
                <tr key={store.number}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {store.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {store.address}
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-h-40 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              Product
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              Size
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {store.products.map((product, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {product.name}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-500">
                                {product.size}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-500">
                                {product.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 