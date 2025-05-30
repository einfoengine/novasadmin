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
  countryId: string;
  assignUserId: string;
  typeOfOrder: string;
  assignDate: string;
  startDate: string;
  deadline: string;
  status: string;
  totalCosts: number;
  currency: string;
  invoiceStatus: string;
}

interface RawCampaign {
  campaignId: string;
  campaignName: string;
  countryId: string;
  assignUserId: string;
  typeOfOrder: string;
  assignDate: string;
  startDate: string;
  deadline: string;
  status: string;
  totalCosts: number;
  currency: string;
  invoiceStatus: string;
}

interface Country {
  id: string;
  name: string;
  totalStores: number;
  currency: string;
  exchangeRate: number;
}

interface User {
  userId: string;
  userName: string;
  userType: string;
  avatarUrl: string;
  joiningDate: string;
  endingDate: string;
  status: string;
  contact: string;
  address: string;
}

export default function Campaigns() {
  const router = useRouter();
  const { theme } = useTheme();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignsRes, countriesRes, usersRes] = await Promise.all([
          fetch('/data/campaigns.json'),
          fetch('/data/countries.json'),
          fetch('/data/users.json')
        ]);
        
        const campaignsData = await campaignsRes.json();
        const countriesData = await countriesRes.json();
        const usersData = await usersRes.json();

        setCampaigns(campaignsData.campaigns.map((campaign: RawCampaign) => ({
          id: campaign.campaignId,
          ...campaign
        })));
        setCountries(countriesData.countries);
        setUsers(usersData.users);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCampaigns([]);
        setCountries([]);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCountryName = (countryId: string) => {
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : countryId;
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.userId === userId);
    return user ? user.userName : userId;
  };

  const handleRowClick = (item: { id: string }) => {
    router.push(`/campaigns/${item.id}`);
  };

  const handleEdit = (item: Campaign) => {
    router.push(`/campaigns/${item.id}/edit`);
  };

  const handleDelete = (item: Campaign) => {
    if (window.confirm(`Are you sure you want to delete campaign "${item.campaignName}"?`)) {
      // Here you would typically make an API call to delete the campaign
      setCampaigns(prevCampaigns => prevCampaigns.filter(c => c.id !== item.id));
    }
  };

  const columns = [
    {
      key: 'campaignName',
      label: 'Campaign Name',
      type: 'text' as const,
    },
    {
      key: 'countryId',
      label: 'Country',
      type: 'text' as const,
      render: (item: { countryId: string }) => getCountryName(item.countryId),
    },
    {
      key: 'assignUserId',
      label: 'Assigned To',
      type: 'text' as const,
      render: (item: { assignUserId: string }) => getUserName(item.assignUserId),
    },
    {
      key: 'typeOfOrder',
      label: 'Order Type',
      type: 'text' as const,
    },
    {
      key: 'assignDate',
      label: 'Assigned Date',
      type: 'date' as const,
    },
    {
      key: 'startDate',
      label: 'Start Date',
      type: 'date' as const,
    },
    {
      key: 'deadline',
      label: 'Deadline',
      type: 'date' as const,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'status' as const,
    },
    {
      key: 'totalCosts',
      label: 'Total Cost',
      type: 'currency' as const,
      format: (value: unknown) => {
        if (value === undefined || value === null) return '-';
        return `${(value as number).toLocaleString()} EUR`;
      },
    },
    {
      key: 'invoiceStatus',
      label: 'Invoice Status',
      type: 'status' as const,
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
      <TableBuilder
        data={campaigns}
        columns={columns as any}
        title="Campaigns"
        icon={<MegaphoneIcon className="h-6 w-6" />}
        searchable
        selectable
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
        actionButton={{
          label: 'Add Campaign',
          href: '/campaigns/new'
        }}
      />
    </main>
  );
}
