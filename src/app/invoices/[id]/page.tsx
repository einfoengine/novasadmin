import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, PrinterIcon } from "@heroicons/react/24/outline";
import invoiceData from "../../../../public/invoices.json";

export default function InvoiceDetail({ params }: { params: { id: string } }) {
  // Find the invoice with matching ID
  const invoice = invoiceData.invoices.find(inv => inv.id === params.id) || invoiceData.invoices[0];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/invoices"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Invoices
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Header with Logo */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-start space-x-4">
              <div className="relative w-24 h-24">
                <Image
                  src="/images/company-logo.png"
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="text-right">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Invoice #{invoice.id}</h1>
                <p className="text-gray-600">Campaign: {invoice.campaignName}</p>
              </div>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {invoice.status}
              </span>
            </div>
          </div>

          {/* Company and Client Info */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">From:</h2>
              <div className="text-gray-600">
                <p>{invoice.company.name}</p>
                <p>{invoice.company.address}</p>
                <p>{invoice.company.city}, {invoice.company.country}</p>
                <p>{invoice.company.email}</p>
                <p>{invoice.company.phone}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">To:</h2>
              <div className="text-gray-600">
                <p>{invoice.client.name}</p>
                <p>{invoice.client.address}</p>
                <p>{invoice.client.city}, {invoice.client.country}</p>
                <p>{invoice.client.email}</p>
                <p>{invoice.client.phone}</p>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Issue Date</p>
                <p className="font-semibold">{invoice.issueDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Due Date</p>
                <p className="font-semibold">{invoice.dueDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Campaign ID</p>
                <p className="font-semibold">{invoice.campaignId}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">#</th>
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Quantity</th>
                  <th className="text-right py-2">Rate</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.number} className="border-b">
                    <td className="py-2">{item.number}</td>
                    <td className="py-2">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <span className="font-medium">{item.productName}</span>
                      </div>
                    </td>
                    <td className="py-2 text-gray-600">{item.description}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">৳{item.rate.toLocaleString()}</td>
                    <td className="py-2 text-right">৳{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="text-right py-2 font-semibold">Total:</td>
                  <td className="text-right py-2 font-semibold">৳{invoice.amount.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <PrinterIcon className="w-5 h-5 mr-2" />
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 