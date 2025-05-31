"use client";
import { useState, useEffect } from "react";
import CampaignList from "@/components/CampaignList";
import UsersTable from "@/components/UsersTable";
import { 
  UsersIcon, 
  ChartBarIcon,
  BuildingStorefrontIcon,
  CogIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CalendarIcon,
  BellIcon
} from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/loadingSpinner";
import { useTheme } from '@/app/providers';
import Link from 'next/link';

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

interface StatCard {
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
  changeType: 'increase' | 'decrease';
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  time: string;
  user: string;
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

  const [stats] = useState<StatCard[]>([
    {
      title: 'Total Users',
      value: '1,234',
      icon: UsersIcon,
      change: '12%',
      changeType: 'increase'
    },
    {
      title: 'Active Stores',
      value: '45',
      icon: BuildingStorefrontIcon,
      change: '8%',
      changeType: 'increase'
    },
    {
      title: 'Total Revenue',
      value: '$45,678',
      icon: CurrencyDollarIcon,
      change: '23%',
      changeType: 'increase'
    },
    {
      title: 'Pending Tasks',
      value: '12',
      icon: DocumentTextIcon,
      change: '5%',
      changeType: 'decrease'
    }
  ]);

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'user',
      description: 'New user registration',
      time: '5 minutes ago',
      user: 'John Doe'
    },
    {
      id: '2',
      type: 'store',
      description: 'Store inventory updated',
      time: '1 hour ago',
      user: 'Jane Smith'
    },
    {
      id: '3',
      type: 'production',
      description: 'New production order created',
      time: '2 hours ago',
      user: 'Mike Johnson'
    }
  ]);

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
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <CalendarIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${
                    stat.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <stat.icon className={`h-6 w-6 ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/users" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <UsersIcon className="h-6 w-6 text-gray-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Users</span>
                    </Link>
                    <Link href="/stores" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <BuildingStorefrontIcon className="h-6 w-6 text-gray-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Stores</span>
                    </Link>
                    <Link href="/productions" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <CogIcon className="h-6 w-6 text-gray-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Production</span>
                    </Link>
                    <Link href="/reports" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <ChartBarIcon className="h-6 w-6 text-gray-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900">Reports</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-gray-100 rounded-full">
                          <UsersIcon className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/activities" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View all activities →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-8">
            <UsersTable 
              title="Users"
              icon={<UsersIcon className="w-6 h-6" />}
              selectable={true}
              onRowClick={handleUserRowClick}
              onEdit={handleUserEdit}
              onDelete={handleUserDelete}
            />
          </div>

          {/* Campaign List */}
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