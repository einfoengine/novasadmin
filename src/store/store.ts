import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import campaignReducer from './features/campaignSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    campaign: campaignReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 