import {
  ForwardedRef,
  Fragment,
  KeyboardEvent,
  forwardRef,
  useEffect,
  useState,
  useRef,
} from "react";
import cn from "classnames";

import { RatingProps } from "./Rating.props";

import style from "./Rating.module.css";
import StarIcon from "../../assets/icons/star.svg";

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      setRating,
      error,
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }

      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }

      if (r == i + 1) {
        return tabIndex ?? 0;
      }

      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            className={cn(style.star, {
              [style.filled]: i < currentRating,
              [style.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}
            tabIndex={computeFocus(rating, i)}
            onKeyDown={handleKey}
            ref={(r) => ratingArrayRef.current?.push(r)}
          >
            <StarIcon />
          </span>
        );
      });

      setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }

      constructRating(i);
    };

    const onClick = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }

      setRating(i);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }

      if (e.code === "ArrowRight" || e.code === "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }

        ratingArrayRef.current[rating]?.focus();
      }

      if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);

        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(style.ratingWrapper, {
          [style.error]: error,
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && <span className={style.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
