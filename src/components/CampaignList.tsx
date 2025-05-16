'use client';
import { useState } from 'react';
import CampaignTable from '@/components/campaign-table';
import CampaignModal from '@/components/campaign-modal';
import { useTheme } from '@/app/providers';

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

      <CampaignTable
        campaigns={campaigns}
        onEdit={onEdit}
        onDelete={onDelete}
      />

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