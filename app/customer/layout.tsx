// app/customer/layout.tsx
import { SnackbarProvider } from "@/components/customer";
import { CartProvider } from "@/app/context/CartContext";
import { OrderProvider } from "@/app/context/OrderContext";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider>
      <CartProvider>
        <OrderProvider>
          {children}
        </OrderProvider>
      </CartProvider>
    </SnackbarProvider>
  );
}
