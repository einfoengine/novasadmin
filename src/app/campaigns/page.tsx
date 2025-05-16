'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import CampaignList from "@/components/CampaignList";
import LoadingSpinner from "@/components/loadingSpinner";

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

export default function Campaigns() {
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

  useEffect(() => {
    const fetchCampaigns = async () => {
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

    fetchCampaigns();
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Inner top nav */}
          <div className="mt-8 nt-top-nav">
            <div className="nt-inner-top mb-6">
              <ul className="flex flex-wrap gap-2">
                {[
                  { name: "Campaign", href: "/campaigns/add-campaign" },
                  { name: "Product", href: "#" },
                  { name: "Country", href: "#" },
                  { name: "Store", href: "#" },
                  { name: "Template", href: "#" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 text-white bg-black px-3 py-1 rounded hover:bg-gray-800"
                    >
                      <PlusIcon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Table Section */}
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
