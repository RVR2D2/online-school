import React from "react";
import cn from "classnames";

import { ReviewFormProps } from "./ReviewForm.props";
import style from "./ReviewForm.module.css";

import { Input, Rating, Textarea, Button } from "../../components";

import CloseIcon from "../../assets/icons/close.svg";

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  return (
    <>
      <div className={cn(style.reviewForm, className)} {...props}>
        <Input placeholder="Имя" />
        <Input placeholder="Заголовок отзыва" className={style.title} />

        <div className={style.rating}>
          <span>Оценка:</span>
          <Rating rating={0} />
        </div>

        <Textarea placeholder="Текст отзыва" className={style.description} />

        <div className={style.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={style.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>

      <div className={style.success}>
        <div className={style.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
        <CloseIcon className={style.close} />
      </div>
    </>
  );
};
