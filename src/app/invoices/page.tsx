"use client";
import { useState, useEffect } from "react";
import TableBuilder from "@/components/TableBuilder";
import { useRouter } from "next/navigation";

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'date' | 'status' | 'link' | 'custom' | 'image';
  format?: (value: unknown) => string;
  render?: <T>(item: T) => React.ReactNode;
  className?: string;
  linkHref?: (value: unknown) => string;
}

interface InvoiceRow {
  id: string;
  orderName: string;
  country: string;
  typeOfOrder: string;
  assignDate: string;
  startDate: string;
  deliveryDate: string;
  totalCosts: number;
  invoiceStatus: string;
}

const columns: Column[] = [
  { key: "id", label: "Invoice No.", className: "font-bold", type: "text" },
  { key: "orderName", label: "Order Name", className: "font-bold", type: "text" },
  { key: "country", label: "Country", className: "font-bold", type: "text" },
  { key: "typeOfOrder", label: "Type of Order", className: "font-bold", type: "text" },
  { key: "assignDate", label: "Assign Date", type: "date", className: "font-bold" },
  { key: "startDate", label: "Start Date", type: "date", className: "font-bold" },
  { key: "deliveryDate", label: "Delivery Date", type: "date", className: "font-bold" },
  { key: "totalCosts", label: "Total Costs", type: "currency", format: (v: unknown) => `${Number(v).toFixed(3)} Euro`, className: "font-bold" },
  { key: "invoiceStatus", label: "Invoice Status", type: "status", render: (item) => {
    const row = item as InvoiceRow;
    return (
      <span className={
        row.invoiceStatus === "Paid"
          ? "font-bold text-green-600"
          : row.invoiceStatus === "Unpaid"
          ? "font-bold text-black"
          : row.invoiceStatus === "Draft"
          ? "font-bold text-yellow-600"
          : row.invoiceStatus === "Closed"
          ? "font-bold text-gray-600"
          : row.invoiceStatus === "Issued"
          ? "font-bold text-blue-600"
          : row.invoiceStatus === "Not Issued"
          ? "font-bold text-gray-400"
          : "font-bold"
      }>
        {row.invoiceStatus}
      </span>
    );
  } },
];

export default function InvoicesPage() {
  const router = useRouter();
  const [rows, setRows] = useState<InvoiceRow[]>([]);
  useEffect(() => {
    fetch("/data/invoices.json")
      .then((res) => res.json())
      .then((data) => setRows(data.invoices));
  }, []);

  const handleRowClick = (item: InvoiceRow) => {
    router.push(`/invoices/${item.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <TableBuilder
        data={rows}
        columns={columns}
        title="Invoices"
        icon={null}
        itemsPerPage={10}
        selectable={false}
        onRowClick={handleRowClick}
        actionButton={{
          label: 'Add Invoice',
          href: '/invoices/new'
        }}
      />
    </div>
  );
} 