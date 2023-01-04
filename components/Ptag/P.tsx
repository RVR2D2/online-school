import React from "react";
import cn from "classnames";

import { PProps } from "./P.props";

import style from "./P.module.css";

export const P = ({
  size = "m",
  children,
  className,
  ...props
}: PProps): JSX.Element => {
  return (
    <p
      className={cn(style.p, className, {
        [style.s]: size === "s",
        [style.m]: size === "m",
        [style.l]: size === "l",
      })}
      {...props}
    >
      {" "}
      {children}
    </p>
  );
};
