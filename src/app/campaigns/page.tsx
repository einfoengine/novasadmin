import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import CampaignList from "@/components/campaign-list";

export default function Campaigns() {
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
            <CampaignList />
          </div>
        </main>
      </div>
    </div>
  );
}
