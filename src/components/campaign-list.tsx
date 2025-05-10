import { PrinterIcon } from "@heroicons/react/24/outline";
import campaignsData from "../../public/campaigns.json";

export default function CampaignList() {
  const { campaigns } = campaignsData;

  return (
    <div id="nt-campaign-table" className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full nt-campaign-table">
        <thead>
          <tr className="text-gray-700 font-semibold text-sm">
            <th className="w-20 p-2 text-left">ID</th>
            <th className="w-56 px-2 text-left">Campaign Name</th>
            <th className="w-36 px-2 text-left">Country</th>
            <th className="w-36 px-2 text-left">Assigned</th>
            <th className="w-32 px-2 text-left">User Type</th>
            <th className="w-36 px-2 text-left">Creating Date</th>
            <th className="w-36 px-2 text-left">Start Date</th>
            <th className="w-36 px-2 text-left">End Date</th>
            <th className="w-20 px-2 text-left">Status</th>
            <th className="w-36 px-2 text-left">Total Cost</th>
            <th className="w-36 px-2 text-left">Invoice Status</th>
            <th className="w-20 px-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.campaignId} className="text-sm border-t border-gray-200 hover:bg-gray-50">
              <td className="w-20 p-2">{campaign.campaignId}</td>
              <td className="w-48 px-2">{campaign.campaignName}</td>
              <td className="w-32 px-2">{campaign.country}</td>
              <td className="w-32 px-2">{campaign.assigned}</td>
              <td className="w-24 px-2">{campaign.userType}</td>
              <td className="w-32 px-2">{campaign.creatingDate}</td>
              <td className="w-32 px-2">{campaign.startDate}</td>
              <td className="w-32 px-2">{campaign.endDate}</td>
              <td className="w-20 px-2">
                <span className={`py-1 rounded-full text-xs ${
                  campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {campaign.status}
                </span>
              </td>
              <td className="w-32 px-2">৳{campaign.totalCost.toLocaleString()}</td>
              <td className="w-32 px-2">
                <span className={`py-1 rounded-full text-xs ${
                  campaign.invoiceStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                  campaign.invoiceStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {campaign.invoiceStatus}
                </span>
              </td>
              <td className="w-20 px-2 text-center">
                <button className="text-blue-600 hover:underline cursor-pointer flex justify-center items-center gap-1 mx-auto">
                  <PrinterIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 