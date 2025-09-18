// LostItemsContext.tsx
import React, { createContext, useContext, type ReactNode, } from "react";
import type { LostItem, LostItemsContextType } from "../type/type";
import imag1 from '../assets/images/Frame.png'
import imag2 from'../assets/images/Frame 401 (2).png'
import imag3 from '../assets/images/Frame 401 (3).png'
import imag4 from '../assets/images/Frame 401 (4).png'
import imag5 from'../assets/images/Frame 401.png'
const LostItemsContext = createContext<LostItemsContextType | undefined>(
  undefined
);

interface LostItemsProviderProps {
  children: ReactNode;
}

export const LostItemsProvider: React.FC<LostItemsProviderProps> = ({
  children,
}) => {
  const lostItems: LostItem[] = [
    {
      id: 1,
      title: "White i POD",
      location: "JFK Terminal 8, Jamaica, New York, USA",
      image: imag1,
      type: "ipod",
    },
    {
      id: 2,
      title: "Laptop Lenovo i7",
      location: "JFK Terminal 8, Jamaica, New York, USA",
      image: imag2,
      type: "laptop",
    },
    {
      id: 3,
      title: "I Phone 7 plus",
      location: "JFK Terminal 8, Jamaica, New York, USA",
      image: imag3,
      type: "phone",
    },
    {
      id: 4,
      title: "Black Tablet",
      location: "JFK Terminal 8, Jamaica, New York, USA",
      image: imag4,
      type: "tablet",
    },
    {
      id: 5,
      title: "Brown Pocket Money",
      location: "JFK Terminal 8, Jamaica, New York, USA",
      image: imag5,
      type: "wallet",
    },
    {
      id: 6,
      title: "Laptop Cable (Charger)",
      location: "JFK Terminal 8, Jamaica, New York, USA",
      image: imag3,
      type: "charger",
    },
    {
      id: 7,
      title: "Adapter",
      location: "JFK Terminal 8, Jamaica, New York, USA",
      image: imag4,
      type: "adapter",
    },
    {
      id: 8,
      title: "Canon Camera",
      location: "JFK Terminal 8, Jamaica, New York, USA",
      image: imag1,
      type: "camera",
    },
  ];

  const contextValue: LostItemsContextType = {
    lostItems,
    loading: false,
  };

  return (
    <LostItemsContext.Provider value={contextValue}>
      {children}
    </LostItemsContext.Provider>
  );
};

export const useLostItems = (): LostItemsContextType => {
  const context = useContext(LostItemsContext);
  if (context === undefined) {
    throw new Error("useLostItems must be used within a LostItemsProvider");
  }
  return context;
};
