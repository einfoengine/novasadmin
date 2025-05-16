"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  image: string;
  size: string;
  material: string;
  channel: string;
  machine: string;
  surface: string;
  dieMood: string;
  gluing: string;
  finishing: string;
  price: number;
  stock: number;
  status: string;
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        const products = Array.isArray(data) ? data : data.products || [];
        const foundProduct = products.find((p: Product) => p.id === params.id);
        setProduct(foundProduct || null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would make an API call to delete the product
      router.push('/products');
    }
  };

  const handleEdit = () => {
    router.push(`/products/${params.id}/edit`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Product not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Products
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PencilIcon className="h-5 w-5 mr-2 text-gray-500" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-2 text-2xl text-indigo-600">${product.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.status === "In Stock" 
                    ? "bg-green-100 text-green-800" 
                    : product.status === "Low Stock"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.status}
                </span>
                <span className="ml-4 text-gray-600">Stock: {product.stock}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Size</h3>
                  <p className="mt-1 text-sm text-gray-900">{product.size}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Material</h3>
                  <p className="mt-1 text-sm text-gray-900">{product.material}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Channel</h3>
                  <p className="mt-1 text-sm text-gray-900">{product.channel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Machine</h3>
                  <p className="mt-1 text-sm text-gray-900">{product.machine}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Surface</h3>
                  <p className="mt-1 text-sm text-gray-900">{product.surface}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Die Mood</h3>
                  <p className="mt-1 text-sm text-gray-900">{product.dieMood}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Gluing</h3>
                  <p className="mt-1 text-sm text-gray-900">{product.gluing}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Finishing</h3>
                  <p className="mt-1 text-sm text-gray-900">{product.finishing}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Product Description</h3>
                <div className="mt-4 prose prose-sm text-gray-500">
                  <p>
                    This {product.name} is crafted with premium {product.material} and features a {product.surface} surface finish. 
                    The product is manufactured using {product.machine} with {product.channel} channel technology, 
                    ensuring high-quality output. The {product.dieMood} die mood and {product.gluing} gluing process 
                    provide excellent durability and structural integrity. The {product.finishing} finishing adds 
                    a professional touch to the final product.
                  </p>
                  <p className="mt-4">
                    Perfect for various applications, this product offers exceptional value at ${product.price.toFixed(2)}. 
                    With dimensions of {product.size}, it provides an optimal balance of size and functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 