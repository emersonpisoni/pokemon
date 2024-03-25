'use client'

import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";

type StoreWrapperProps = {
  children: ReactNode
}

export function StoreWrapper({ children }: StoreWrapperProps) {
  return <Provider store={store}>{children}</Provider>
}