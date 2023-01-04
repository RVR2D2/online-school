import React, { useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import { SearchProps } from "./Search.props";
import style from "./Search.module.css";
import SearchIcon from "../../assets/icons/search.svg";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      goToSearch();
    }
  };

  return (
    <div className={cn(className, style.search)} {...props}>
      <Input
        placeholder="Поиск..."
        className={style.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        //@ts-ignore
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={style.button}
        onClick={goToSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};
