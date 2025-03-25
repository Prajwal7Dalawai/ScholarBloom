export function Card({ children, className }) {
  return (
    <div className={`bg-card text-card-foreground rounded-lg shadow-lg max-w-sm mx-auto my-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
