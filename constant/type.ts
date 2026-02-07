

export enum UserRole {
  Admin = 'ADMIN',
  Provider = 'PROVIDER',
  Customer = 'CUSTOMER',
};


export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  phone: string | null;
  status: string;
  // Use 'string' if this comes from JSON/API. 
  // Use 'Date' if this comes directly from a Prisma/ORM object.
  createdAt: string; 
  updatedAt: string; 
}


export interface CategoryData {
  id: string;
  name: string;
}

export type MenuData = {
  id?: string;
  name: string;
  isAvailable: boolean;
  ratings:number;
  price: number;
  description?: string | null; 
  image?: string | null;
  tags?: string[];
  isFeatured?: boolean;
  isSignature?: boolean;
  isNew?: boolean;
  category_id: string;
  createdAt?: Date;
  updateAt?: Date;
  
  // Optional: If you include relations in your queries
  category?: {
    id: string;
    name: string;
  };
};


export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  order_id: string;
  menu_id: string;
  // If you include menu details in the fetch:
  menu?: {
    id: string;
    title: string;
    image: string;
  };
}

export interface OrderFetch {
  id: string;
  orderNumber: string;
  status: string;
  
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  
  paymentStatus: string;
  paymentMethod: string;
  
  customerName: string | null;
  customerPhone: string;
  deliveryAddress: string;
  deliveryNote: string | null; // Can be empty string or null
  
  user_id: string;
  user?: AuthUser; // Optional depending on if you include it in the query
  
  items: OrderItem[];
  
  createdAt: string; // ISO String from API
  updateAt: string;  // ISO String from API
}


