// types.ts
export interface LostItem {
  id: number;
  title: string;
  location: string;
  image: string;
  type: string;
}

export interface LostItemsContextType {
  lostItems: LostItem[];
  loading: boolean;
}
