"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingCartIcon, 
  CubeIcon, 
  BuildingStorefrontIcon,
  PencilIcon,
  XMarkIcon,
  PrinterIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface Campaign {
  campaignId: string;
  campaignName: string;
  country: string;
  assigned: string;
  userType: string;
  creatingDate: string;
  startDate: string;
  endDate: string;
  status: string;
  totalCost: number;
  invoiceStatus: string;
}

interface Stats {
  orders: number;
  products: number;
  stores: number;
}

export default function AdminPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState<Stats>({ orders: 0, products: 0, stores: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState({
    campaignName: '',
    country: '',
    assigned: '',
    userType: '',
    creatingDate: '',
    startDate: '',
    endDate: '',
    status: 'Active',
    totalCost: '',
    invoiceStatus: 'Pending'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignsRes, ordersRes, productsRes, storesRes] = await Promise.all([
          fetch('/campaigns.json'),
          fetch('/orders.json'),
          fetch('/products.json'),
          fetch('/stores.json')
        ]);

        const [campaignsData, ordersData, productsData, storesData] = await Promise.all([
          campaignsRes.json(),
          ordersRes.json(),
          productsRes.json(),
          storesRes.json()
        ]);

        setCampaigns(campaignsData.campaigns);
        setStats({
          orders: ordersData.orders.length,
          products: productsData.products.length,
          stores: storesData.stores.length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      campaignName: campaign.campaignName,
      country: campaign.country,
      assigned: campaign.assigned,
      userType: campaign.userType,
      creatingDate: campaign.creatingDate,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      status: campaign.status,
      totalCost: campaign.totalCost.toString(),
      invoiceStatus: campaign.invoiceStatus
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedCampaign) {
        // Update existing campaign
        const updatedCampaigns = campaigns.map(c => 
          c.campaignId === selectedCampaign.campaignId 
            ? { ...c, ...formData, totalCost: parseFloat(formData.totalCost) }
            : c
        );
        setCampaigns(updatedCampaigns);
        toast.success('Campaign updated successfully');
      } else {
        // Create new campaign
        const newCampaign: Campaign = {
          campaignId: `CAMP${String(campaigns.length + 1).padStart(3, '0')}`,
          campaignName: formData.campaignName,
          country: formData.country,
          assigned: formData.assigned,
          userType: formData.userType,
          creatingDate: formData.creatingDate,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: formData.status,
          totalCost: parseFloat(formData.totalCost),
          invoiceStatus: formData.invoiceStatus
        };
        setCampaigns([...campaigns, newCampaign]);
        toast.success('Campaign created successfully');
      }
      setShowModal(false);
      setSelectedCampaign(null);
      setFormData({
        campaignName: '',
        country: '',
        assigned: '',
        userType: '',
        creatingDate: '',
        startDate: '',
        endDate: '',
        status: 'Active',
        totalCost: '',
        invoiceStatus: 'Pending'
      });
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast.error('Failed to save campaign');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
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

        {/* Campaigns Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Campaigns</h2>
              <button
                onClick={() => {
                  setSelectedCampaign(null);
                  setFormData({
                    campaignName: '',
                    country: '',
                    assigned: '',
                    userType: '',
                    creatingDate: '',
                    startDate: '',
                    endDate: '',
                    status: 'Active',
                    totalCost: '',
                    invoiceStatus: 'Pending'
                  });
                  setShowModal(true);
                }}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Add New Campaign
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creating Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.campaignId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.campaignId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.campaignName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.assigned}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.userType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.creatingDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.endDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${campaign.totalCost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.invoiceStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                        campaign.invoiceStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {campaign.invoiceStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(campaign)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            // In a real application, this would trigger the print functionality
                            window.print();
                            toast.success('Printing campaign details...');
                          }}
                          className="text-gray-600 hover:text-gray-900"
                          title="Print"
                        >
                          <PrinterIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedCampaign ? 'Edit Campaign' : 'Add New Campaign'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="assigned" className="block text-sm font-medium text-gray-700">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    id="assigned"
                    value={formData.assigned}
                    onChange={(e) => setFormData({ ...formData, assigned: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                    User Type
                  </label>
                  <input
                    type="text"
                    id="userType"
                    value={formData.userType}
                    onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="creatingDate" className="block text-sm font-medium text-gray-700">
                    Creating Date
                  </label>
                  <input
                    type="date"
                    id="creatingDate"
                    value={formData.creatingDate}
                    onChange={(e) => setFormData({ ...formData, creatingDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="totalCost" className="block text-sm font-medium text-gray-700">
                    Total Cost
                  </label>
                  <input
                    type="number"
                    id="totalCost"
                    value={formData.totalCost}
                    onChange={(e) => setFormData({ ...formData, totalCost: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label htmlFor="invoiceStatus" className="block text-sm font-medium text-gray-700">
                    Invoice Status
                  </label>
                  <select
                    id="invoiceStatus"
                    value={formData.invoiceStatus}
                    onChange={(e) => setFormData({ ...formData, invoiceStatus: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
                >
                  {selectedCampaign ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 