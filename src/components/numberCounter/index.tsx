import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../utils";

type CounterProps = {
  format: (value: number) => string;

  targetValue: number;

  direction?: "up" | "down";

  delay?: number;

  className?: string;
};

export default function Counter({
  format = (value: number) => value.toString(),
  targetValue,
  direction = "up",
  delay = 0,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isGoingUp = direction === "up";
  const motionValue = useMotionValue(isGoingUp ? 0 : targetValue);

  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 50,
  });
  const isInView = useInView(ref, { margin: "0px", once: true });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      motionValue.set(isGoingUp ? targetValue : 0);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, delay, isGoingUp, targetValue, motionValue]);

  useEffect(() => {
    springValue.on("change", (value) => {
      if (ref.current) {
        ref.current.textContent = format(value);
      }
    });
  }, [springValue, format]);

  return (
    <span
      ref={ref}
      className={cn("font-medium text-lg text-foreground", className)}
    />
  );
}
