"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/loading";

export default function AdminLoading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (show) return null;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
