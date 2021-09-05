import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { FirestoreProvider } from "../lib/FirestoreProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <FirestoreProvider>
        <Component {...pageProps} />
      </FirestoreProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
