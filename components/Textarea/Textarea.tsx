import React from "react";
import cn from "classnames";

import { InputProps } from "./Input.props";

import style from "./Input.module.css";

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input type="text" className={cn(className, style.input)} {...props} />
  );
};
