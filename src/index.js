import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import Header from "./Header";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <ChakraProvider>
        <Header />
        <App />
        </ChakraProvider>
    </StrictMode>,
    rootElement
);
