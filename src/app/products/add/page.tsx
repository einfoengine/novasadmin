"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductFormData {
  productId: string;
  productName: string;
  productCost: number;
  productPrice: number;
  productStock: number;
  imageUrl: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const productData: ProductFormData = {
      productId: formData.get("productId") as string,
      productName: formData.get("productName") as string,
      productCost: parseFloat(formData.get("productCost") as string),
      productPrice: parseFloat(formData.get("productPrice") as string),
      productStock: parseInt(formData.get("productStock") as string),
      imageUrl: formData.get("imageUrl") as string,
    };

    try {
      // Here you would typically make an API call to save the product
      console.log("New product data:", productData);
      
      // For now, we'll just redirect back to the products page
      router.push("/products");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <Link
            href="/products"
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
                Product ID
              </label>
              <input
                type="text"
                name="productId"
                id="productId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., P009"
              />
            </div>

            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label htmlFor="productCost" className="block text-sm font-medium text-gray-700">
                Cost Price
              </label>
              <input
                type="number"
                name="productCost"
                id="productCost"
                required
                step="0.01"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                Selling Price
              </label>
              <input
                type="number"
                name="productPrice"
                id="productPrice"
                required
                step="0.01"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                name="productStock"
                id="productStock"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="/images/products/example.jpg"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/products"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 