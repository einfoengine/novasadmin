"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PrinterIcon, ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Printer {
  id: string;
  name: string;
  segment: string;
  printerType: string;
  dependency_type: string;
  dependencies: string[];
  description: string;
  size: string;
  color: string;
  price: string;
  image?: string;
}

export default function PrinterDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const [printer, setPrinter] = useState<Printer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrinter = async () => {
      try {
        const response = await fetch('/data/printers.json');
        if (!response.ok) throw new Error('Failed to fetch printer');
        
        const data = await response.json();
        const foundPrinter = data.printers.find((p: Printer) => p.id === resolvedParams.id);
        
        if (!foundPrinter) {
          throw new Error('Printer not found');
        }

        setPrinter(foundPrinter);
        setError(null);
      } catch (error) {
        console.error('Error fetching printer:', error);
        setError(error instanceof Error ? error.message : 'Failed to load printer');
      } finally {
        setLoading(false);
      }
    };

    fetchPrinter();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !printer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error || 'Printer not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PrinterIcon className="w-6 h-6 text-gray-500" />
                <h1 className="text-xl font-semibold text-gray-900">Printer Details</h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push(`/productions/printers/${printer.id}/edit`)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                {printer.image ? (
                  <Image
                    src={printer.image}
                    alt={printer.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <PrinterIcon className="w-16 h-16" />
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{printer.name}</h2>
                  <p className="text-sm text-gray-500">ID: {printer.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Type</h3>
                    <p className="mt-1 text-sm text-gray-900">{printer.printerType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Size</h3>
                    <p className="mt-1 text-sm text-gray-900">{printer.size}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Color</h3>
                    <p className="mt-1 text-sm text-gray-900">{printer.color}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="mt-1 text-sm text-gray-900">${printer.price}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-sm text-gray-900">{printer.description}</p>
                </div>

                {printer.dependencies && printer.dependencies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dependencies</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {printer.dependencies.map((dependency) => (
                        <span
                          key={dependency}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {dependency}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 