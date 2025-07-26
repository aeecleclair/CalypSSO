"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

interface MotionFieldProps {
  children: React.ReactNode;
  radius?: number;
}
/**
 *  You need to add the following classes to the <input> component
 *
 * `flex h-10 w-full border-none bg-background rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
 *         file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-2
 *         focus-visible:outline-none focus-visible:ring-2
 *          disabled:cursor-not-allowed disabled:opacity-50
 *          dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
 *          group-hover/input:shadow-none transition duration-400
 *          `
 */
export const MotionField = (props: MotionFieldProps) => {
  const radius = props.radius ?? 100; // change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          hsl(var(--ring)),
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      {props.children}
    </motion.div>
  );
};
