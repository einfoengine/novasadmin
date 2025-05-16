import { notFound } from "next/navigation";

interface Country {
  id: string;
  name: string;
  totalStores: number;
  currency: string;
  exchangeRate: number;
}

export default async function CountryDetailPage({ params }: { params: { id: string } }) {
  // Use absolute URL for fetch in server components
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/countries.json`, { cache: 'force-cache' });
  if (!res.ok) return notFound();
  const data = await res.json();
  const country: Country | undefined = data.countries.find((c: Country) => c.id === params.id);

  if (!country) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-4">{country.name}</h1>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Country ID</dt>
            <dd className="text-lg text-gray-900">{country.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Total Stores</dt>
            <dd className="text-lg text-gray-900">{country.totalStores}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Currency</dt>
            <dd className="text-lg text-gray-900">{country.currency}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Exchange Rate</dt>
            <dd className="text-lg text-gray-900">{country.exchangeRate}</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
