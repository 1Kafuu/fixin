// app/context/OrderContext.tsx
"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { StatusType } from "@/components/customer";

export type OrderItem = {
  id: string;
  techId: string;
  techName: string;
  techPhoto: string;
  status: StatusType;
  bookingType: "pickup" | "home";
  deviceName: string;
  damageDescription: string;
  address: string;
  scheduledDate: Date;
  totalAmount: number;
  createdAt: Date;
  services: Array<{
    id: string;
    name: string;
    price: number;
  }>;
};

type OrderAction =
  | { type: "ADD_ORDER"; payload: OrderItem }
  | { type: "UPDATE_ORDER"; payload: { id: string; status: StatusType } }
  | { type: "CANCEL_ORDER"; payload: { id: string } }
  | { type: "LOAD_ORDERS"; payload: OrderItem[] };

type OrderState = {
  orders: OrderItem[];
};

const initialState: OrderState = {
  orders: [],
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    case "CANCEL_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, status: "cancelled" as StatusType }
            : order
        ),
      };
    case "LOAD_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
}

interface OrderContextType {
  orders: OrderItem[];
  addOrder: (order: OrderItem) => void;
  updateOrderStatus: (id: string, status: StatusType) => void;
  cancelOrder: (id: string) => void;
  getOrderById: (id: string) => OrderItem | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = "fixin-orders";

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as OrderItem[];
        dispatch({ type: "LOAD_ORDERS", payload: parsed });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.orders));
  }, [state.orders]);

  const addOrder = (order: OrderItem) => {
    dispatch({ type: "ADD_ORDER", payload: order });
  };

  const updateOrderStatus = (id: string, status: StatusType) => {
    dispatch({ type: "UPDATE_ORDER", payload: { id, status } });
  };

  const cancelOrder = (id: string) => {
    dispatch({ type: "CANCEL_ORDER", payload: { id } });
  };

  const getOrderById = (id: string) => {
    return state.orders.find((order) => order.id === id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        addOrder,
        updateOrderStatus,
        cancelOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
