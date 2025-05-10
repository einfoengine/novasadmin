"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AdminCards from "../components/admin-cards";
import CampaignList from "../components/campaign-list";
import LoadingSpinner from "../components/loading-spinner";

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

  const handleDelete = (campaignId: string) => {
    setCampaigns(campaigns.filter(c => c.campaignId !== campaignId));
    toast.success('Campaign deleted successfully');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <AdminCards stats={stats} />

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
    </div>
  );
} 