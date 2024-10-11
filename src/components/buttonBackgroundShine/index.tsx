import { cn } from "../../utils";

export function ButtonBackgroundShine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "inline-flex animate-shine items-center justify-center rounded border border-green-300 text-sm bg-[linear-gradient(110deg,#e6ffe6,45%,#9ae6b4,55%,#e6ffe6)] bg-[length:200%_100%] px-6 py-2 text-black transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
}
