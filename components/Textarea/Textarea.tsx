import React from "react";
import cn from "classnames";

import { TextareaProps } from "./Textarea.props";

import style from "./Textarea.module.css";

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return <textarea className={cn(className, style.input)} {...props} />;
};
