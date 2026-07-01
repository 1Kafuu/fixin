export const animations = {
  fadeIn: "animate-fadeIn",
  fadeInUp: "animate-fadeInUp",
  popIn: "animate-popIn",
};

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div 
      className={`animate-fadeIn ${className}`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
