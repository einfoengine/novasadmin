"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

interface Country {
  countryId: string;
  countryName: string;
  countryManagerId: string;
}

interface Store {
  storeId: string;
  storeName: string;
  countryId: string;
  countryName: string;
  address: string;
  storeManagerId: string;
  storeContact: string;
}

interface Product {
  productId: string;
  productName: string;
  productCost: number;
  productPrice: number;
  productStock: number;
}

interface StoreData {
  stores: Store[];
}

interface CountryData {
  countries: Country[];
}

interface ProductData {
  products: Product[];
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
  const [countries, setCountries] = useState<Country[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

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
          fetch("/countries.json"),
          fetch("/stores.json"),
          fetch("/products.json")
        ]);

        const countriesData: CountryData = await countriesRes.json();
        const storesData: StoreData = await storesRes.json();
        const productsData: ProductData = await productsRes.json();

        setCountries(countriesData.countries);
        setStores(storesData.stores);
        setProducts(productsData.products);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotalCost = () => {
      const total = selectedProducts.reduce((sum, item) => {
        const product = products.find(p => p.productId === item.productId);
        return sum + (product ? product.productCost * item.quantity : 0);
      }, 0);
      setTotalCost(total);
      setValue("totalCost", total);
    };

    calculateTotalCost();
  }, [selectedProducts, products, setValue]);

  const handleProductChange = (productId: string, quantity: number) => {
    const existingProductIndex = selectedProducts.findIndex(
      (p) => p.productId === productId
    );

    if (existingProductIndex >= 0) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex] = { productId, quantity };
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, { productId, quantity }]);
    }
    setValue("selectedProducts", selectedProducts);
  };

  const onSubmit = async (data: CampaignFormData) => {
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }

      toast.success("Campaign created successfully");
      router.push("/campaigns");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign");
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full bg-white">
        <h1 className="text-2xl font-bold p-6 border-b">Add New Campaign</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 border p-4 rounded-lg">
              <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">
                Campaign Name
              </label>
              <input
                id="campaignName"
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("campaignName")}
                placeholder="Enter campaign name"
              />
              {errors.campaignName && (
                <p className="text-sm text-red-500">{errors.campaignName.message}</p>
              )}
            </div>

            <div className="space-y-2 border p-4 rounded-lg">
              <label htmlFor="campaignDescription" className="block text-sm font-medium text-gray-700">
                Campaign Description
              </label>
              <textarea
                id="campaignDescription"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("campaignDescription")}
                placeholder="Enter campaign description"
              />
              {errors.campaignDescription && (
                <p className="text-sm text-red-500">{errors.campaignDescription.message}</p>
              )}
            </div>

            <div className="space-y-2 border p-4 rounded-lg">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2 border p-4 rounded-lg">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                Delivery Date
              </label>
              <input
                id="endDate"
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("endDate")}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>

            <div className="space-y-2 border p-4 rounded-lg">
              <label htmlFor="countries" className="block text-sm font-medium text-gray-700">
                Countries
              </label>
              <select
                id="countries"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onChange={(e) => {
                  const value = e.target.value;
                  const currentValues = watch("countries") || [];
                  if (!currentValues.includes(value)) {
                    setValue("countries", [...currentValues, value]);
                  }
                }}
              >
                <option value="">Select countries</option>
                {countries.map((country) => (
                  <option key={country.countryId} value={country.countryId}>
                    {country.countryName}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCountries.map((countryId: string) => {
                  const country = countries.find((c) => c.countryId === countryId);
                  return (
                    <div
                      key={countryId}
                      className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-2 border border-gray-300"
                    >
                      <span>{country?.countryName}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setValue(
                            "countries",
                            selectedCountries.filter((id: string) => id !== countryId)
                          );
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
              {errors.countries && (
                <p className="text-sm text-red-500">{errors.countries.message}</p>
              )}
            </div>

            <div className="space-y-2 border p-4 rounded-lg">
              <label htmlFor="storeCodes" className="block text-sm font-medium text-gray-700">
                Store Codes
              </label>
              <select
                id="storeCodes"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onChange={(e) => {
                  const value = e.target.value;
                  const currentValues = watch("storeCodes") || [];
                  if (!currentValues.includes(value)) {
                    setValue("storeCodes", [...currentValues, value]);
                  }
                }}
              >
                <option value="">Select stores</option>
                {stores
                  .filter((store) => selectedCountries.includes(store.countryId))
                  .map((store) => (
                    <option key={store.storeId} value={store.storeId}>
                      {store.storeName} ({store.storeId})
                    </option>
                  ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-2">
                {watch("storeCodes")?.map((storeId: string) => {
                  const store = stores.find((s) => s.storeId === storeId);
                  return (
                    <div
                      key={storeId}
                      className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-2 border border-gray-300"
                    >
                      <span>{store?.storeName}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setValue(
                            "storeCodes",
                            watch("storeCodes")?.filter((id: string) => id !== storeId) || []
                          );
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
              {errors.storeCodes && (
                <p className="text-sm text-red-500">{errors.storeCodes.message}</p>
              )}
            </div>

            <div className="space-y-2 border p-4 rounded-lg">
              <label htmlFor="products" className="block text-sm font-medium text-gray-700">
                Products
              </label>
              <select
                id="products"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onChange={(e) => {
                  const value = e.target.value;
                  const product = products.find(p => p.productId === value);
                  if (product) {
                    handleProductChange(product.productId, 1);
                  }
                }}
              >
                <option value="">Select products</option>
                {products.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName} (${product.productPrice})
                  </option>
                ))}
              </select>
              <div className="space-y-2 mt-2">
                {selectedProducts.map((item) => {
                  const product = products.find(p => p.productId === item.productId);
                  return (
                    <div key={item.productId} className="flex items-center gap-2 border border-gray-300 p-2 rounded-md">
                      <span className="flex-1">{product?.productName}</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                          handleProductChange(item.productId, parseInt(e.target.value))}
                        className="w-20 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProducts(selectedProducts.filter(p => p.productId !== item.productId));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
              {errors.selectedProducts && (
                <p className="text-sm text-red-500">{errors.selectedProducts.message}</p>
              )}
            </div>

            <div className="space-y-2 border p-4 rounded-lg">
              <label htmlFor="totalCost" className="block text-sm font-medium text-gray-700">
                Total Cost
              </label>
              <input
                id="totalCost"
                type="number"
                value={totalCost.toFixed(2)}
                readOnly
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 