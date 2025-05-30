"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useDispatch } from 'react-redux';

interface Country {
  id: string;
  name: string;
}

interface Store {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
}

interface SelectedProduct {
  productId: string;
  quantity: number;
}

const campaignSchema = z.object({
  campaignName: z.string().min(1, "Campaign name is required"),
  campaignDescription: z.string().min(1, "Campaign description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  countries: z.array(z.string()).min(1, "At least one country is required"),
  storeCodes: z.array(z.string()).min(1, "At least one store is required"),
  selectedProducts: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1, "Quantity must be at least 1")
  })).min(1, "At least one product is required"),
  totalCost: z.number()
});

type CampaignFormData = z.infer<typeof campaignSchema>;

export default function AddCampaignPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<Country[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      countries: [],
      storeCodes: [],
      selectedProducts: [],
      totalCost: 0
    },
  });

  const selectedCountries = watch("countries");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, storesRes, productsRes] = await Promise.all([
          fetch("/data/countries.json"),
          fetch("/data/stores.json"),
          fetch("/data/products.json")
        ]);

        const [countriesData, storesData, productsData] = await Promise.all([
          countriesRes.json(),
          storesRes.json(),
          productsRes.json()
        ]);

        setCountries(countriesData.countries || []);
        setStores(storesData.stores || []);
        setProducts(productsData.products || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCountries && selectedCountries.length > 0) {
      const filtered = stores.filter(store => 
        selectedCountries.includes(store.id)
      );
      setValue("storeCodes", filtered.map(store => store.id));
    }
  }, [selectedCountries, stores, setValue]);

  useEffect(() => {
    const calculateTotalCost = () => {
      const total = selectedProducts.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product ? product.name.length * item.quantity : 0);
      }, 0);
      setTotalCost(total);
      setValue("totalCost", total);
    };

    calculateTotalCost();
  }, [selectedProducts, products, setValue]);

  const handleProductChange = (productId: string, quantity: number) => {
    // Ensure quantity is a valid number
    const validQuantity = isNaN(quantity) ? 1 : Math.max(1, Math.min(quantity, 999));
    
    const existingProductIndex = selectedProducts.findIndex(
      (p) => p.productId === productId
    );

    if (existingProductIndex >= 0) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex] = { productId, quantity: validQuantity };
      setSelectedProducts(updatedProducts);
      setValue("selectedProducts", updatedProducts);
    } else {
      const newProducts = [...selectedProducts, { productId, quantity: validQuantity }];
      setSelectedProducts(newProducts);
      setValue("selectedProducts", newProducts);
    }
  };

  const onSubmit = async (data: CampaignFormData) => {
    try {
      // Create a campaign object with all the necessary data
      const campaignData = {
        ...data,
        id: `CAMP${Date.now()}`,
        createdAt: new Date().toISOString()
      };

      // Dispatch the campaign data to Redux store
      dispatch(setCurrentCampaign(campaignData));

      // Navigate to the summary page
      router.push(`/campaigns/${campaignData.id}`);
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Create Campaign</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Campaign Name</label>
          <input
            className="w-full border rounded px-3 py-2 mb-4"
            {...register("campaignName")}
            placeholder="Enter campaign name"
          />
          {errors.campaignName && (
            <p className="text-sm text-red-500">{errors.campaignName.message}</p>
          )}
          <label className="block font-semibold mb-1">Country</label>
          <select
            className="w-full border rounded px-3 py-2 mb-4"
            {...register("countries")}
            multiple
          >
            <option value="">Select countries</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.countries && (
            <p className="text-sm text-red-500">{errors.countries.message}</p>
          )}
          <label className="block font-semibold mb-1">Start Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 mb-4"
            {...register("startDate")}
          />
          {errors.startDate && (
            <p className="text-sm text-red-500">{errors.startDate.message}</p>
          )}
          <label className="block font-semibold mb-1">Delivery Deadline</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 mb-4"
            {...register("endDate")}
          />
          {errors.endDate && (
            <p className="text-sm text-red-500">{errors.endDate.message}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Store</label>
          <select
            className="w-full border rounded px-3 py-2 mb-4"
            {...register("storeCodes")}
            multiple
          >
            <option value="">Select stores</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {errors.storeCodes && (
            <p className="text-sm text-red-500">{errors.storeCodes.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <label className="block font-semibold mb-1">Product</label>
        <div className="flex gap-2 mb-2">
          <select
            className="flex-1 border rounded px-3 py-2"
            {...register("selectedProducts")}
            onChange={(e) => {
              const value = e.target.value;
              const product = products.find(p => p.id === value);
              if (product) {
                handleProductChange(product.id, 1);
              }
            }}
          >
            <option value="">Select products</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="border rounded p-2 bg-gray-50">
          {selectedProducts.map((item) => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return null;
            
            return (
              <div key={item.productId} className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img
                    src={product.name}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <div className="mt-1 flex items-center gap-4">
                    <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor={`quantity-${item.productId}`} className="text-sm text-gray-600">
                      Quantity:
                    </label>
                    <input
                      id={`quantity-${item.productId}`}
                      type="number"
                      min="1"
                      max={999}
                      value={item.quantity || 1}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 1 : parseInt(e.target.value);
                        handleProductChange(item.productId, value);
                      }}
                      className="w-20 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProducts(selectedProducts.filter(p => p.productId !== item.productId));
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {errors.selectedProducts && (
          <p className="text-sm text-red-500">{errors.selectedProducts.message}</p>
        )}
      </div>
      <div className="mt-6">
        <label className="block font-semibold mb-1">Total Cost</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={totalCost.toFixed(2)}
          readOnly
        />
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Create Campaign
        </button>
      </div>
    </div>
  );
} 