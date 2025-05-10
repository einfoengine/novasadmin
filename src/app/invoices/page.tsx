import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Invoices() {
  const invoices = [
    {
      id: "INV001",
      campaignId: "CAMP001",
      campaignName: "Summer Sale 2024",
      amount: 15000.00,
      status: "Paid",
      dueDate: "2024-03-15",
      issueDate: "2024-03-01"
    },
    {
      id: "INV002",
      campaignId: "CAMP002",
      campaignName: "Holiday Special",
      amount: 25000.00,
      status: "Pending",
      dueDate: "2024-04-15",
      issueDate: "2024-04-01"
    },
    {
      id: "INV003",
      campaignId: "CAMP003",
      campaignName: "Spring Promotion",
      amount: 18000.00,
      status: "Overdue",
      dueDate: "2024-02-15",
      issueDate: "2024-02-01"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Inner top nav */}
          <div className="mt-8 nt-top-nav">
            <div className="nt-inner-top mb-6">
              <ul className="flex flex-wrap gap-2">
                {[
                  { name: "Invoice", href: "/invoices/new" },
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
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr className="text-gray-700 font-semibold text-sm">
                    <th className="w-24 p-2 text-left">Invoice ID</th>
                    <th className="w-24 p-2 text-left">Campaign ID</th>
                    <th className="w-48 p-2 text-left">Campaign Name</th>
                    <th className="w-32 p-2 text-left">Amount</th>
                    <th className="w-24 p-2 text-left">Status</th>
                    <th className="w-32 p-2 text-left">Due Date</th>
                    <th className="w-32 p-2 text-left">Issue Date</th>
                    <th className="w-24 p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="text-sm border-t border-gray-200 hover:bg-gray-50">
                      <td className="p-2">
                        <Link href={`/invoices/${invoice.id}`} className="text-blue-600 hover:underline">
                          {invoice.id}
                        </Link>
                      </td>
                      <td className="p-2">{invoice.campaignId}</td>
                      <td className="p-2">{invoice.campaignName}</td>
                      <td className="p-2">৳{invoice.amount.toLocaleString()}</td>
                      <td className="p-2">
                        <span className={`py-1 px-3 rounded-full text-xs ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="p-2">{invoice.dueDate}</td>
                      <td className="p-2">{invoice.issueDate}</td>
                      <td className="p-2 text-center">
                        <Link 
                          href={`/invoices/${invoice.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 