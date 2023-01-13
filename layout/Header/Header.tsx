import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import cn from "classnames";
import { motion } from "framer-motion";
import { HeaderProps } from "./Header.props";

import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { Sidebar } from "../Sidebar/Sidebar";

import style from "./Header.module.css";
import Logo from "../../assets/icons/logo.svg";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },

    closed: {
      opacity: 0,
      x: "100%",
    },
  };

  return (
    <header className={cn(className, style.header)} {...props}>
      <Logo />
      <ButtonIcon
        icon="burger"
        appearance="white"
        onClick={() => setIsOpened(true)}
      />
      <motion.div
        className={style.mobileMenu}
        variants={variants}
        initial="closed"
        animate={isOpened ? "opened" : "closed"}
      >
        <Sidebar />
        <ButtonIcon
          icon="close"
          appearance="white"
          className={style.menuClose}
          onClick={() => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
};
