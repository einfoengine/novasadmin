"use client";
import { useState, useEffect } from "react";
import CampaignList from "@/components/CampaignList";
import StatsCard from "@/components/StatsCard";
import UsersTable from "@/components/UsersTable";
import { UsersIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/loadingSpinner";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
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
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/campaigns.json');
        const data = await res.json();
        setCampaigns(data.campaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
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
      }
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
    }
  };

  const handleDelete = (campaignId: string) => {
    setCampaigns(campaigns.filter(c => c.campaignId !== campaignId));
  };

  const handleUserEdit = (user: User) => {
    // Implement user edit logic
    console.log('Edit user:', user);
  };

  const handleUserDelete = (userId: string) => {
    // Implement user delete logic
    console.log('Delete user:', userId);
  };

  const handleUserRowClick = (user: User) => {
    // Implement user row click logic
    console.log('User clicked:', user);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Main Content */}
      <div className="nt-dashboard-main-content w-full">
        {/* Content */}
        <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              title="Current Campaigns"
              value={campaigns.filter(c => c.status === 'Active').length.toString()}
              icon={<UsersIcon className="w-6 h-6 " />}
              iconColor=""
              iconBg="bg-gray-100 dark:bg-gray-800"
              percentage="12%"
              percentageColor="text-green-500"
              trend="Increased by"
            />

            <StatsCard
              title="Upcoming Campaigns"
              value={campaigns.filter(c => new Date(c.startDate) > new Date()).length.toString()}
              icon={<UsersIcon className="w-6 h-6 " />}
              iconColor=""
              iconBg="bg-gray-100 dark:bg-gray-800"
              percentage="12%"
              percentageColor="text-green-500"
              trend="Increased by"
            />
            <StatsCard 
              title="Invoice status" 
              value={campaigns.filter(c => c.invoiceStatus === 'Paid').length.toString()} 
              icon={<ChartBarIcon className="w-6 h-6 " />} 
              iconColor="" 
              iconBg="bg-gray-100 dark:bg-gray-800" 
              percentage="12%" 
              percentageColor="text-green-500" 
              trend="Increased by"
            />
          </div>

          {/* Users Table */}
          <div className="mt-8">
            <UsersTable 
              title="Users"
              icon={<UsersIcon className="w-6 h-6 " />}
              selectable={true}
              onRowClick={handleUserRowClick}
              onEdit={handleUserEdit}
              onDelete={handleUserDelete}
            />
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <CampaignList
              campaigns={campaigns}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              selectedCampaign={selectedCampaign}
              setSelectedCampaign={setSelectedCampaign}
            />
          </div>
        </main>
      </div>
    </div>
  );
} 