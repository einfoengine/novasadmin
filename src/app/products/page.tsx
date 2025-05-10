"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Product {
  productId: string;
  productName: string;
  productCost: number;
  productPrice: number;
  productStock: number;
  imageUrl: string;
}

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data.products);
        setDisplayedProducts(data.products.slice(0, ITEMS_PER_PAGE));
        setHasMore(data.products.length > ITEMS_PER_PAGE);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    const currentLength = displayedProducts.length;
    const nextProducts = products.slice(currentLength, currentLength + ITEMS_PER_PAGE);
    
    setTimeout(() => {
      setDisplayedProducts([...displayedProducts, ...nextProducts]);
      setHasMore(currentLength + ITEMS_PER_PAGE < products.length);
      setLoadingMore(false);
    }, 500); // Simulate network delay
  };

  const handleAction = async (action: string, product: Product) => {
    const confirmMessage = {
      edit: "Are you sure you want to edit this product?",
      delete: "Are you sure you want to delete this product?",
      view: "Are you sure you want to view this product's details?"
    };

    const successMessage = {
      edit: "Redirecting to edit page...",
      delete: "Product deleted successfully",
      view: "Redirecting to view page..."
    };

    if (window.confirm(confirmMessage[action as keyof typeof confirmMessage])) {
      toast.success(successMessage[action as keyof typeof successMessage]);
      
      switch (action) {
        case 'edit':
          window.location.href = `/products/edit/${product.productId}`;
          break;
        case 'delete':
          setProducts(products.filter(p => p.productId !== product.productId));
          setDisplayedProducts(displayedProducts.filter(p => p.productId !== product.productId));
          break;
        case 'view':
          window.location.href = `/products/${product.productId}`;
          break;
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <Link
            href="/products/add"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add New Product
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 border-b">
            <div className="col-span-1 font-medium text-gray-900">Image</div>
            <div className="col-span-2 font-medium text-gray-900">Product ID</div>
            <div className="col-span-3 font-medium text-gray-900">Name</div>
            <div className="col-span-2 font-medium text-gray-900">Cost</div>
            <div className="col-span-2 font-medium text-gray-900">Price</div>
            <div className="col-span-1 font-medium text-gray-900">Stock</div>
            <div className="col-span-1 font-medium text-gray-900">Actions</div>
          </div>

          <div className="divide-y divide-gray-200">
            {displayedProducts.map((product) => (
              <div key={product.productId} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                <div className="col-span-1">
                  <div className="relative w-12 h-12">
                    <Image
                      src={product.imageUrl}
                      alt={product.productName}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
                <div className="col-span-2 text-gray-900">{product.productId}</div>
                <div className="col-span-3 text-gray-900">{product.productName}</div>
                <div className="col-span-2 text-gray-900">${product.productCost.toFixed(2)}</div>
                <div className="col-span-2 text-gray-900">${product.productPrice.toFixed(2)}</div>
                <div className="col-span-1 text-gray-900">{product.productStock}</div>
                <div className="col-span-1">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAction('view', product)}
                      className="text-gray-600 hover:text-gray-900"
                      title="View"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAction('edit', product)}
                      className="text-gray-600 hover:text-gray-900"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAction('delete', product)}
                      className="text-gray-600 hover:text-gray-900"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  loadingMore
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {loadingMore ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Load More'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 