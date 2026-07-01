export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} border-4 border-[oklch(0.92_0_0)] border-t-[oklch(0.55_0.15_250)] rounded-full animate-spin`}
      />
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export function Loading() {
  return <Spinner size="md" />;
}
