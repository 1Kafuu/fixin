"use client";

import { SnackbarProvider } from "@/components/customer";
import { CartProvider } from "@/app/context/CartContext";
import { OrderProvider } from "@/app/context/OrderContext";
import Footer from "@/components/ui/Footer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SnackbarProvider>
      <CartProvider>
        <OrderProvider>
          <div className="min-h-screen bg-background">
            <main>{children}</main>
          </div>
          <Footer />
        </OrderProvider>
      </CartProvider>
    </SnackbarProvider>
  );
}
