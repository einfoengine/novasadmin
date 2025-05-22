"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BeakerIcon, PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Material {
  id: string;
  name: string;
  segment: string;
  materialType: string;
  dependency_type: string;
  dependencies: string[];
  description: string;
  size: string;
  color: string;
  price: string;
  image?: string;
}

export default function MaterialDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch('/data/materials.json');
        if (!response.ok) throw new Error('Failed to fetch material');
        
        const data = await response.json();
        const foundMaterial = data.materials.find((m: Material) => m.id === params.id);
        
        if (!foundMaterial) {
          throw new Error('Material not found');
        }

        setMaterial(foundMaterial);
        setError(null);
      } catch (error) {
        console.error('Error fetching material:', error);
        setError(error instanceof Error ? error.message : 'Failed to load material');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/productions/materials/${params.id}/edit`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error || 'Material not found'}</div>
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
                <BeakerIcon className="w-6 h-6 text-gray-500" />
                <h1 className="text-xl font-semibold text-gray-900">Material Details</h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Material
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Image */}
              <div className="space-y-4">
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                  {material.image ? (
                    <Image
                      src={material.image}
                      alt={material.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <BeakerIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{material.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">ID: {material.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Type</h3>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{material.materialType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Segment</h3>
                    <p className="mt-1 text-sm text-gray-900">{material.segment}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Size</h3>
                    <p className="mt-1 text-sm text-gray-900">{material.size}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Color</h3>
                    <p className="mt-1 text-sm text-gray-900">{material.color}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="mt-1 text-sm text-gray-900">${material.price}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dependency Type</h3>
                    <p className="mt-1 text-sm text-gray-900">{material.dependency_type}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-sm text-gray-900">{material.description}</p>
                </div>

                {material.dependencies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dependencies</h3>
                    <ul className="mt-1 text-sm text-gray-900 list-disc list-inside">
                      {material.dependencies.map((dep, index) => (
                        <li key={index}>{dep}</li>
                      ))}
                    </ul>
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