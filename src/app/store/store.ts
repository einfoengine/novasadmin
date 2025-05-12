import { configureStore } from '@reduxjs/toolkit';
import campaignReducer from '@/app/store/features/campaignSlice';

export const store = configureStore({
  reducer: {
    campaign: campaignReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 