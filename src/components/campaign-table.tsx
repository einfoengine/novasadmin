import Link from 'next/link';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

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

interface CampaignTableProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaignId: string) => void;
}

export default function CampaignTable({ campaigns, onEdit, onDelete }: CampaignTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="flex bg-gray-50 border-b border-gray-200">
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</div>
            <div className="w-48 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creating Date</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Status</div>
            <div className="w-32 flex-shrink-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <div key={campaign.campaignId} className="flex">
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">{campaign.campaignId}</div>
                <div className="w-48 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                  <Link href={`/campaigns/campaign-summary?id=${campaign.campaignId}`} className="text-blue-600 hover:text-blue-900">
                    {campaign.campaignName}
                  </Link>
                </div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">{campaign.country}</div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">{campaign.assigned}</div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">{campaign.userType}</div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">{campaign.creatingDate}</div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">{campaign.startDate}</div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">{campaign.endDate}</div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                  ${campaign.totalCost.toLocaleString()}
                </div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    campaign.invoiceStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                    campaign.invoiceStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {campaign.invoiceStatus}
                  </span>
                </div>
                <div className="w-32 flex-shrink-0 px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(campaign)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(campaign.campaignId)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 