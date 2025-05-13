import { NextResponse } from "next/server";

interface Campaign {
  id: string;
  campaignName: string;
  campaignDescription: string;
  startDate: string;
  endDate: string;
  countries: string[];
  storeCodes: string[];
  selectedProducts: {
    productId: string;
    quantity: number;
  }[];
  totalCost: number;
  createdAt: string;
}

// This is a mock database. In a real application, you would use a real database
const campaigns: { [key: string]: Campaign } = {};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate a unique ID for the campaign
    const id = `CAMP${Date.now()}`;
    
    // Create the campaign object
    const campaign: Campaign = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    };

    // Store the campaign in our mock database
    campaigns[id] = campaign;

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
} 