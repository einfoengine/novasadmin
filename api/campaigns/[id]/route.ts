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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const campaign = campaigns[params.id];
    
    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaign" },
      { status: 500 }
    );
  }
} 