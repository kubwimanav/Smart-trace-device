// types.ts
export interface LostItem {
  id: number;
  title: string;
  location: string;
  image: string;
  deviceimage: string;
  type: string;
  district: string;
}

export interface LostItemsContextType {
  lostItems: LostItem[];
  loading: boolean;
}

export interface Founditem {
  name: string;
  category: string;
  description: string;
  serialnumber: number;
  founderEmail: string;
  location: string;
  phoneNumber: string;
  firstName: string;
  address: string;
  province: string;
  district: string;
  lastName: string;
  deviceimage: null;
}
