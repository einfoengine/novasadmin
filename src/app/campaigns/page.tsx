'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { PlusIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import TableBuilder from "@/components/TableBuilder";
import { useTheme } from '../providers';

interface Campaign {
  id: string;
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

interface RawCampaign {
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

export default function Campaigns() {
  const router = useRouter();
  const { theme } = useTheme();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch('/data/campaigns.json');
        const data = await res.json();
        // Transform the data to include id field
        const transformedCampaigns = (data.campaigns || []).map((campaign: RawCampaign) => ({
          id: campaign.campaignId,
          ...campaign
        }));
        setCampaigns(transformedCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleRowClick = (item: { id: string }) => {
    router.push(`/campaigns/${item.id}`);
  };

  const columns = [
    {
      key: 'campaignName',
      label: 'Campaign Name',
      type: 'text' as const,
    },
    {
      key: 'country',
      label: 'Country',
      type: 'text' as const,
    },
    {
      key: 'assigned',
      label: 'Assigned To',
      type: 'text' as const,
    },
    {
      key: 'userType',
      label: 'User Type',
      type: 'text' as const,
    },
    {
      key: 'startDate',
      label: 'Start Date',
      type: 'text' as const,
    },
    {
      key: 'endDate',
      label: 'End Date',
      type: 'text' as const,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'text' as const,
    },
    {
      key: 'totalCost',
      label: 'Total Cost',
      type: 'number' as const,
      format: (value: unknown) => {
        if (value === undefined || value === null) return '-';
        return `$${(value as number).toLocaleString()}`;
      },
    },
    {
      key: 'invoiceStatus',
      label: 'Invoice Status',
      type: 'text' as const,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MegaphoneIcon className="h-6 w-6" />
            Campaigns
          </h1>
          <Link
            href="/campaigns/add-campaign"
            className="flex items-center gap-1 text-white bg-black px-3 py-1 rounded hover:bg-gray-800"
          >
            <PlusIcon className="w-4 h-4" />
            Add Campaign
          </Link>
        </div>
      </div>
      <TableBuilder
        data={campaigns}
        columns={columns}
        onRowClick={handleRowClick}
        searchable
        selectable
        title="Campaigns"
        icon={<MegaphoneIcon className="h-6 w-6" />}
      />
    </main>
  );
}
