"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

export type TechnicianBooking = {
  id: string;
  techId: string;
  techName: string;
  techPhoto: string;
  techSpecialty: string;
  orderType: "pickup" | "home";
  deviceName: string;
  deviceType: string;
  damageDesc: string;
  baseFee: number;
  visitFee: number;
  checkFee: number;
  total: number;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export type CartItem = TechnicianBooking | Service;

type CartAction =
  | { type: "ADD_TECHNICIAN_BOOKING"; payload: TechnicianBooking }
  | { type: "ADD_SERVICE"; payload: Service }
  | { type: "REMOVE_ITEM"; payload: { id: string; type: "tech" | "service" } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

type CartState = {
  technicianBookings: TechnicianBooking[];
  services: Service[];
};

const initialState: CartState = {
  technicianBookings: [],
  services: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TECHNICIAN_BOOKING":
      return {
        ...state,
        technicianBookings: [action.payload],
      };
    case "ADD_SERVICE":
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    case "REMOVE_ITEM":
      if (action.payload.type === "tech") {
        return {
          ...state,
          technicianBookings: state.technicianBookings.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      } else {
        return {
          ...state,
          services: state.services.filter((item) => item.id !== action.payload.id),
        };
      }
    case "CLEAR_CART":
      return initialState;
    case "LOAD_CART":
      return action.payload;
    default:
      return state;
  }
}

type CartContextType = {
  cart: CartState;
  addTechnicianBooking: (booking: TechnicianBooking) => void;
  addService: (service: Service) => void;
  removeItem: (id: string, type: "tech" | "service") => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "fixin-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartState;
        dispatch({ type: "LOAD_CART", payload: parsed });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addTechnicianBooking = (booking: TechnicianBooking) => {
    dispatch({ type: "ADD_TECHNICIAN_BOOKING", payload: booking });
  };

  const addService = (service: Service) => {
    dispatch({ type: "ADD_SERVICE", payload: service });
  };

  const removeItem = (id: string, type: "tech" | "service") => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, type } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const totalItems = cart.technicianBookings.length + cart.services.length;
  const totalPrice =
    cart.technicianBookings.reduce((sum, b) => sum + b.total, 0) +
    cart.services.reduce((sum, s) => sum + s.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addTechnicianBooking,
        addService,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export const PREDEFINED_SERVICES: Service[] = [
  {
    id: "svc-screen-replacement",
    name: "Screen Replacement",
    description: "Ganti layar rusak atau pecah",
    price: 200000,
    category: "Laptop",
  },
  {
    id: "svc-battery-change",
    name: "Battery Change",
    description: "Ganti baterai yang tidak bisa holding",
    price: 150000,
    category: "Laptop",
  },
  {
    id: "svc-keyboard-repair",
    name: "Keyboard Repair",
    description: "Perbaiki keyboard yang error atau ganti tombol",
    price: 100000,
    category: "Laptop",
  },
  {
    id: "svc-virus-removal",
    name: "Virus Removal",
    description: "Bersihkan virus dan malware",
    price: 80000,
    category: "Software",
  },
  {
    id: "svc-windows-install",
    name: "Windows Install",
    description: "Install ulang Windows (licence included)",
    price: 150000,
    category: "Software",
  },
  {
    id: "svc-data-recovery",
    name: "Data Recovery",
    description: "Recover data dari harddisk/laptop rusak",
    price: 300000,
    category: "Data",
  },
  {
    id: "svc-ssd-upgrade",
    name: "SSD Upgrade",
    description: "Upgrade atau install SSD baru",
    price: 250000,
    category: "Hardware",
  },
  {
    id: "svc-charging-port",
    name: "Charging Port Fix",
    description: "Perbaiki port charger yang longgar",
    price: 120000,
    category: "Hardware",
  },
  {
    id: "svc-iphone-screen",
    name: "iPhone Screen Replacement",
    description: "Ganti layar iPhone original",
    price: 500000,
    category: "Smartphone",
  },
  {
    id: "svc-android-screen",
    name: "Android Screen Replacement",
    description: "Ganti layar Android original",
    price: 350000,
    category: "Smartphone",
  },
  {
    id: "svc-printer-fix",
    name: "Printer Repair",
    description: "Perbaiki printer yang error atau kertas macet",
    price: 100000,
    category: "Elektronik",
  },
  {
    id: "svc-ac-service",
    name: "AC Service",
    description: "Service AC rutin - cleaning dan check",
    price: 150000,
    category: "Elektronik",
  },
];
