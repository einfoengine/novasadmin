'use client';
import { useState } from 'react';
import CampaignTable from '@/components/campaign-table';
import CampaignModal from '@/components/campaign-modal';
import { useTheme } from '@/app/providers';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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

interface CampaignListProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaignId: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    campaignName: string;
    country: string;
    assigned: string;
    userType: string;
    creatingDate: string;
    startDate: string;
    endDate: string;
    status: string;
    totalCost: string;
    invoiceStatus: string;
  };
  setFormData: (data: CampaignListProps['formData']) => void;
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign | null) => void;
}

export default function CampaignList({
  campaigns,
  onEdit,
  onDelete,
  onSubmit,
  formData,
  setFormData,
  selectedCampaign,
  setSelectedCampaign
}: CampaignListProps) {
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();

  const handleAddNew = () => {
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
  };

  return (
    <div className="mt-8">
      <div className={`p-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-b`}>
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Campaigns</h2>
          <button
            onClick={handleAddNew}
            className={`${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-black hover:bg-gray-800'} text-white px-4 py-2 rounded-md transition-colors`}
          >
            Add New Campaign
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              Campaign Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              Assigned
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              User Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              Creating Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              End Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              Total Cost
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              Invoice Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200 dark:divide-gray-700`}>
          {campaigns.map((campaign) => (
            <tr key={campaign.campaignId} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {campaign.campaignName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {campaign.country}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {campaign.assigned}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {campaign.userType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {campaign.creatingDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {campaign.startDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {campaign.endDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  campaign.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {campaign.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${campaign.totalCost.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  campaign.invoiceStatus === 'Paid' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {campaign.invoiceStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onEdit(campaign)}
                    className="text-gray-900 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(campaign.campaignId)}
                    className="text-gray-900 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CampaignModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!selectedCampaign}
      />
    </div>
  );
} 