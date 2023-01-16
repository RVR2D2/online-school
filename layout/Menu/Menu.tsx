import React, { KeyboardEventHandler, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import { motion } from "framer-motion";

import { AppContext } from "../../context/app.context";

import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";

import style from "./Menu.module.css";

export const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <div
                className={cn(style.firstLevel, {
                  [style.firstLevelActive]: m.id == firstCategory,
                })}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };
  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={style.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true;
          }

          return (
            <div key={m._id.secondCategory}>
              <div
                tabIndex={0}
                className={style.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                //@ts-ignore
                onKeyDown={(key: KeyboardEvent): void =>
                  openSecondLevelKey(key, m._id.secondCategory)
                }
              >
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
                className={cn(style.secondLevelBlock)}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };
  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((p) => (
      <motion.div key={p._id} variants={variantsChildren}>
        <Link
          tabIndex={isOpened ? 0 : -1}
          href={`/${route}/${p.alias}`}
          className={cn(style.thirdLevel, {
            [style.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
          })}
        >
          {p.category}
        </Link>
      </motion.div>
    ));
  };

  return <div className={style.menu}>{buildFirstLevel()}</div>;
};
