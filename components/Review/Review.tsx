import React from "react";
import { ReviewProps } from "./Review.props";
import cn from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { Rating } from "../Rating/Rating";

import style from "./Review.module.css";

import UserIcon from "../../assets/icons/user.svg";

export const Review = ({
  review,
  className,
  ...props
}: ReviewProps): JSX.Element => {
  const { name, title, description, createdAt, rating } = review;

  return (
    <div className={cn(style.review, className)} {...props}>
      <UserIcon className={style.user} />

      <div>
        <span className={style.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>

      <div className={style.date}>
        {format(new Date(createdAt), "dd MMMM, yyyy", { locale: ru })}
      </div>

      <div className={style.rating}>
        <Rating rating={rating} />
      </div>

      <div className={style.description}>{description}</div>
    </div>
  );
};
