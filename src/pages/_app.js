

import "@/styles/globals.css";
import { Header_component } from "@/components/header/header_component";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header_component /> {/* This will be displayed on all pages */}
      <Component {...pageProps} />
    </>
  );
}
