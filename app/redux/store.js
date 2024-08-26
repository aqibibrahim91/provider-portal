"use client";
import { configureStore } from "@reduxjs/toolkit";
import EditReducer from "@/components/EditInvoiceSlice";

export const store = configureStore({
  reducer: {
    editCase: EditReducer,
  },
});
