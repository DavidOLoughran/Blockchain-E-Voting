import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

const appId = "6nHDMUsCh9pJ7SVJ4KQwbRKBDHeHiT2A1baUYJMU";
const serverUrl = "https://3fxisly2dx7q.usemoralis.com:2053/server";

ReactDOM.render(

  <React.StrictMode>

    <Auth0Provider
      domain="blockchain-evoting.eu.auth0.com"
      clientId="ltBxUsMWtP3sDKoey2TLu9DSnOJOZfby"
      redirectUri={window.location.origin}
    >
      <MoralisProvider appId={appId} serverUrl={serverUrl}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </MoralisProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
