import { configureStore } from "@reduxjs/toolkit";
import ecommerceReducer from "./redux/ecommerceSlice"; 

export const store = configureStore({
  reducer: {
    ecommerce: ecommerceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
