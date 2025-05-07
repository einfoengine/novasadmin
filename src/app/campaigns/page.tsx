import Link from "next/link";
import { PrinterIcon, PlusIcon} from "@heroicons/react/24/outline";
export default function Campaigns() {
  

  const data = [
    {
      id: 1,
      country: "Campaign",
      assigned: "10",
      typeofuser: "Admin",
      creatingdate: "2025-05-07",
      startdate: "2025-05-07",
      enddate: "2025-05-07",
      status: "Active",
      totalcost: "1000",
      invoicestatus: "Paid",
    },
    {
      id: 2,
      country: "Campaign",
      assigned: "10",
      typeofuser: "Admin",
      creatingdate: "2025-05-07",
      startdate: "2025-05-07",
      enddate: "2025-05-07",
      status: "Active",
      totalcost: "1000",
      invoicestatus: "Paid",
    },
    {
      id: 3,
      country: "Campaign",
      assigned: "10",
      typeofuser: "Admin",
      creatingdate: "2025-05-07",
      startdate: "2025-05-07",
      enddate: "2025-05-07",
      status: "Active",
      totalcost: "1000",
      invoicestatus: "Paid",
    },
    {
      id: 4,
      country: "Campaign",
      assigned: "10",
      typeofuser: "Admin",
      creatingdate: "2025-05-07",
      startdate: "2025-05-07",
      enddate: "2025-05-07",
      status: "Active",
      totalcost: "1000",
      invoicestatus: "Paid",
    },
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
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <div className="min-w-full nt-campaign-table">
                {/* Header */}
                <div className="flex bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-2">
                  <div className="w-12">ID</div>
                  <div className="w-32">Country</div>
                  <div className="w-24">Assigned</div>
                  <div className="w-24">User Type</div>
                  <div className="w-32">Creating Date</div>
                  <div className="w-32">Start Date</div>
                  <div className="w-32">End Date</div>
                  <div className="w-20">Status</div>
                  <div className="w-24">Total Cost</div>
                  <div className="w-28">Invoice Status</div>
                  <div className="w-20 text-center">Action</div>
                </div>

                {/* Data Rows */}
                {data.map((item) => (
                  <div key={item.id} className="flex text-sm px-4 py-2 border-t border-gray-200 hover:bg-gray-50">
                    <div className="w-12">{item.id}</div>
                    <div className="w-32">{item.country}</div>
                    <div className="w-24">{item.assigned}</div>
                    <div className="w-24">{item.typeofuser}</div>
                    <div className="w-32">{item.creatingdate}</div>
                    <div className="w-32">{item.startdate}</div>
                    <div className="w-32">{item.enddate}</div>
                    <div className="w-20">{item.status}</div>
                    <div className="w-24">৳{item.totalcost}</div>
                    <div className="w-28">{item.invoicestatus}</div>
                    <div className="w-20 text-center text-blue-600 hover:underline cursor-pointer flex justify-center items-center gap-1"><PrinterIcon className="w-5 h-5" /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
