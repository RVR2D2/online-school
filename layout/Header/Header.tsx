import React from "react";
import { HeaderProps } from "./Header.props";

import style from "./Header.module.css";

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
  return <div {...props}>Header</div>;
};
