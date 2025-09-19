// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { LostItemsProvider } from './context/ItemContext.tsx';
// import { Provider } from 'react-redux';
// import { store } from './Store/index.ts';
// import { AuthProvider } from "./context/AuthContext";

// createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//     <Provider store={store}>
//     <LostItemsProvider>
//       <AuthProvider>
//           <App />
//       </AuthProvider>
//     </LostItemsProvider>
//     </Provider>
//     </StrictMode>                            
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { LostItemsProvider } from "./context/ItemContext";
import { Provider } from "react-redux";
import { store } from "./Store";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <LostItemsProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </LostItemsProvider>
    </Provider>
  </StrictMode>
);
