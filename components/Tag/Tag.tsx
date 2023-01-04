import React from "react";
import cn from "classnames";

import { TagProps } from "./Tag.props";
import style from "./Tag.module.css";
export const Tag = ({
  size = "s",
  children,
  color = "ghost",
  href,
  className,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(style.tag, className, {
        [style.s]: size === "s",
        [style.m]: size === "m",
        [style.ghost]: color == "ghost",
        [style.red]: color == "red",
        [style.grey]: color == "grey",
        [style.green]: color == "green",
        [style.primary]: color == "primary",
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
