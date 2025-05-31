import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedProduct {
  productId: string;
  productType: string;
  quantities: {
    totalQuantity?: number;
    quantityA?: number;
    quantityB?: number;
  };
}

interface Campaign {
  id: string;
  campaignName: string;
  campaignDescription: string;
  startDate: string;
  endDate: string;
  countries: string[];
  storeCodes: string[];
  selectedProducts: SelectedProduct[];
  totalCost: number;
  createdAt: string;
}

interface CampaignState {
  currentCampaign: Campaign | null;
}

const initialState: CampaignState = {
  currentCampaign: null,
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCurrentCampaign: (state, action: PayloadAction<Campaign>) => {
      state.currentCampaign = action.payload;
    },
  },
});

export const { setCurrentCampaign } = campaignSlice.actions;
export default campaignSlice.reducer; 