import CountryDetailsClient from './CountryDetailsClient';

export default async function CountryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CountryDetailsClient id={id} />;
}
