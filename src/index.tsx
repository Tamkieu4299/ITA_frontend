import React from "react";
import { App } from "./App";
import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "./store";
import { BrowserRouter } from "react-router-dom";
import { AxiosInterceptor } from "./api/axiosClient";
import {
    StyledEngineProvider,
    experimental_extendTheme as extendTheme,
    Experimental_CssVarsProvider as CssVarsProvider
} from "@mui/material";

// Create store
const initialState = {};
const { store, persistor } = makeStore(initialState);

const myTheme = extendTheme({ typography: { button: { textTransform: "none" } } });

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StyledEngineProvider injectFirst>
        <CssVarsProvider theme={myTheme}>
            <Provider store={store}>
                <AxiosInterceptor>
                    <BrowserRouter>
                        <PersistGate loading={null} persistor={persistor}>
                            <App />
                        </PersistGate>
                    </BrowserRouter>
                </AxiosInterceptor>
            </Provider>
        </CssVarsProvider>
    </StyledEngineProvider>
);
