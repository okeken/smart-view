import React, { useState, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@state/index";
import { WagmiConfig, createClient } from "wagmi";
import { ThemeProvider } from "next-themes";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import Header from "./components/Header";
import chains from "./config/chains";

const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
    chains,
  })
);

enum ETheme {
  light = "light",
  dark = "dark",
}
const Providers = ({ children }: any) => {
  const [theme, setTheme] = useState(ETheme.dark);
  const sTheme = () => {
    setTheme(theme === ETheme.light ? ETheme.dark : ETheme.light);
  };

  useEffect(() => {
    const t = localStorage.getItem("theme");
    if (t === "dark") {
      setTheme(ETheme.dark);
      return;
    }
    setTheme(ETheme.light);
  }, []);
  return (
    <div className="">
      <ReduxProvider store={store}>
        <WagmiConfig client={client}>
          <ThemeProvider attribute="class" enableSystem={false}>
            <ConnectKitProvider theme="auto" mode={theme}>
              <Header setCurrentTheme={sTheme} />
              {children}
            </ConnectKitProvider>
          </ThemeProvider>
        </WagmiConfig>
      </ReduxProvider>
    </div>
  );
};

export default Providers;
