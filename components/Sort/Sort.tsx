import React from "react";
import cn from "classnames";

import { SortEnum, SortProps } from "./Sort.props";

import style from "./Sort.module.css";
import SortIco from "../../assets/icons/sort.svg";

const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(style.sort, className)} {...props}>
      <button
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [style.active]: sort == SortEnum.Rating,
        })}
      >
        <SortIco className={style.sortIcon} />
        По рейтингу
      </button>
      <button
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [style.active]: sort == SortEnum.Price,
        })}
      >
        <SortIco className={style.sortIcon} />
        По цене
      </button>
    </div>
  );
};

export default Sort;
