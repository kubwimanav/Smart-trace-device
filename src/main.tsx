import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LostItemsProvider } from './context/ItemContext.tsx';
import { Provider } from 'react-redux';
import { store } from './Store/index.ts';

createRoot(document.getElementById("root")!).render(
    <StrictMode>
    <Provider store={store}>
      <LostItemsProvider>

   
        <App />
   </LostItemsProvider>
    </Provider>
    </StrictMode>
);
