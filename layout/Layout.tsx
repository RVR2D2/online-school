import React, { FunctionComponent, useRef, useState } from "react";
import { LayoutProps } from "./Layout.props";

import style from "./Layout.module.css";
import { Header, Sidebar, Footer } from "../layout";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components";
import cn from "classnames";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] =
    useState<boolean>(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false);
  };

  return (
    <div className={style.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        tabIndex={1}
        className={cn(style.skipLink, {
          [style.displayed]: isSkipLinkDisplayed,
        })}
        //@ts-ignore
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={style.header} />
      <Sidebar className={style.sidebar} />
      <div className={style.body} ref={bodyRef} tabIndex={0}>
        {children}
      </div>

      <Footer className={style.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
