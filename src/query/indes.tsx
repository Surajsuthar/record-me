"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface props {
  children: React.ReactNode;
}

export const ReactQueryProvider = ({ children }: props) => {
  const Query = new QueryClient();
  return <QueryClientProvider client={Query}>{children}</QueryClientProvider>;
};
