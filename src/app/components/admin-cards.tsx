import Link from 'next/link';
import { ShoppingCartIcon, CubeIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

interface Stats {
    orders: number;
    products: number;
    stores: number;
}

interface AdminCardsProps {
    stats: Stats;
}

export default function AdminCards({ stats }: AdminCardsProps) {
  return (
    <div className="nt-component nt-admin-cards">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.orders}</p>
              </div>
              <ShoppingCartIcon className="h-8 w-8 text-gray-400" />
            </div>
            <Link href="/orders/add" className="mt-4 text-sm text-gray-600 hover:text-gray-900">
              Add New Order →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.products}</p>
              </div>
              <CubeIcon className="h-8 w-8 text-gray-400" />
            </div>
            <Link href="/products/add" className="mt-4 text-sm text-gray-600 hover:text-gray-900">
              Add New Product →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stores</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.stores}</p>
              </div>
              <BuildingStorefrontIcon className="h-8 w-8 text-gray-400" />
            </div>
            <Link href="/stores/add" className="mt-4 text-sm text-gray-600 hover:text-gray-900">
              Add New Store →
            </Link>
          </div>
        </div>
    </div>
  );
}