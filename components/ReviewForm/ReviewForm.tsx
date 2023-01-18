import React, { useState } from "react";
import axios from "axios";

import { useForm, Controller } from "react-hook-form";

import cn from "classnames";

import { ReviewFormProps } from "./ReviewForm.props";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";

import style from "./ReviewForm.module.css";

import { Input, Rating, Textarea, Button } from "../../components";

import CloseIcon from "../../assets/icons/close.svg";
import { API } from "../../helpers/api";

export const ReviewForm = ({
  productId,
  className,
  isOpened,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError("Что-то пошло не так");
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(style.reviewForm, className)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Заполните имя" },
          })}
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Заполните заголовок" },
          })}
          placeholder="Заголовок отзыва"
          className={style.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={style.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: "Укажите рейтинг" },
            }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register("description", {
            required: { value: true, message: "Заполните текст отзыва" },
          })}
          placeholder="Текст отзыва"
          className={style.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={style.submit}>
          <Button appearance="primary" tabIndex={isOpened ? 0 : -1}>
            Отправить
          </Button>
          <span className={style.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(style.success, style.panel)}>
          <div className={style.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <CloseIcon
            className={style.close}
            onClick={() => setIsSuccess(false)}
          />
        </div>
      )}
      {error && (
        <div className={cn(style.error, style.panel)}>
          Что-то пошло не так, попробуйте обновить страницу
          <CloseIcon
            className={style.close}
            onClick={() => setError(undefined)}
          />
        </div>
      )}
    </form>
  );
};
