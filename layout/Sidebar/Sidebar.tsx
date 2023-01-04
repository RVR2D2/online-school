import React from "react";
import { SidebarProps } from "./Sidebar.props";

import { Menu } from "../../layout";
import { Search } from "../../components";

import style from "./Sidebar.module.css";
import Logo from "../../assets/icons/logo.svg";
import cn from "classnames";

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, style.sidebar)} {...props}>
      <Logo className={style.logo} />
      <Search />
      <Menu />
    </div>
  );
};
