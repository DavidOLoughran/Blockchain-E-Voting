import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";

import { BrowserRouter, Route, Switch } from "react-router-dom";



const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

console.log(process.env.REACT_APP_MORALIS_APP_ID)
console.log(process.env.REACT_APP_CONTRACT_ADDRESS)

const appId = process.env.REACT_APP_MORALIS_APP_ID;
const serverUrl = "https://3fxisly2dx7q.usemoralis.com:2053/server";



ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>

      <MoralisProvider appId={appId} serverUrl={serverUrl}>

        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>

      </MoralisProvider>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
