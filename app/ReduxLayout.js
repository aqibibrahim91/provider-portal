"use client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import React from "react";

function ReduxLayout({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxLayout;
