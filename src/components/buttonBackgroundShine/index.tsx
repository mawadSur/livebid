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
        "inline-flex animate-shine items-center justify-center rounded border border-green-400 text-sm bg-[linear-gradient(110deg,#bbf7d0,45%,#86efac,55%,#bbf7d0)] bg-[length:200%_100%] px-6 py-2 font-medium text-green-900 transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
}
