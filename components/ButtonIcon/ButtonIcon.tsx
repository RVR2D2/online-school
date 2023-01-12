import React from "react";

import { ButtonIconProps, icons } from "./ButtonIcon.props";
import cn from "classnames";
import style from "./ButtonIcon.module.css";

export const ButtonIcon = ({
  appearance,
  icon,
  className,
  ...props
}: ButtonIconProps): JSX.Element => {
  const IconComponent = icons[icon];

  return (
    <button
      className={cn(style.button, className, {
        [style.primary]: appearance === "primary",
        [style.white]: appearance === "white",
      })}
      {...props}
    >
      <IconComponent />
    </button>
  );
};
