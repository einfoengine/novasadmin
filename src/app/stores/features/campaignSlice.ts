import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedProduct {
  productId: string;
  quantity: number;
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

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCurrentCampaign: (state, action: PayloadAction<Campaign>) => {
      state.currentCampaign = action.payload;
    },
    clearCurrentCampaign: (state) => {
      state.currentCampaign = null;
    },
  },
});

export const { setCurrentCampaign, clearCurrentCampaign } = campaignSlice.actions;
export default campaignSlice.reducer; 