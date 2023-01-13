import { ButtonProps } from "./Button.props";
import style from "./Button.module.css";
import cn from "classnames";

import ArrowIcon from "../../assets/icons/arrow.svg";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export const Button = ({
  children,
  arrow = "none",
  appearance,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  const scale = useMotionValue(1);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(style.button, className, {
        [style.primary]: appearance === "primary",
        [style.ghost]: appearance === "ghost",
      })}
      style={{ scale }}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={cn(style.arrow, {
            [style.down]: arrow === "down",
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};
