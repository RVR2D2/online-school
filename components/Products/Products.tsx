import React, { ForwardedRef, forwardRef, useRef, useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { motion } from "framer-motion";

import {
  Card,
  Rating,
  Tag,
  Button,
  Divider,
  Review,
  ReviewForm,
} from "../../components";

import { ProductProps } from "./Products.props";
import style from "./Products.module.css";

import { decOfNumber, priceRu } from "../../helpers/helpers";

export const Products = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: {
          opacity: 1,
          height: "auto",
        },
        hidden: {
          opacity: 0,
          height: 0,
        },
      };

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        reviewRef.current?.focus();
      };

      return (
        <div className={className} ref={ref} {...props}>
          <Card className={style.product}>
            <div className={style.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={style.title}>{product.title}</div>
            <div className={style.price}>
              {priceRu(product.price)}
              {product.oldPrice && (
                <Tag className={style.oldPrice} color="green">
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={style.credit}>
              {priceRu(product.credit)}/<span className={style.month}>мес</span>
            </div>
            <div className={style.rating}>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={style.tags}>
              {product.categories.map((c) => (
                <Tag key={c} className={style.category} color="ghost">
                  {c}
                </Tag>
              ))}
            </div>
            <div className={style.priceTitle}>цена</div>
            <div className={style.creditTitle}>кредит</div>
            <div className={style.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}
                {decOfNumber(product.reviewCount, [
                  " отзыв",
                  " отзыва",
                  " отзывов",
                ])}
              </a>
            </div>
            <Divider className={style.hr} />
            <div className={style.description}>{product.description}</div>
            <div className={style.feature}>
              {product.characteristics.map((c) => (
                <div className={style.characteristics} key={c.name}>
                  <span className={style.characteristicsName}>{c.name}</span>
                  <span className={style.characteristicsDots}></span>
                  <span className={style.characteristicsValue}>{c.value}</span>
                </div>
              ))}
            </div>
            <div className={style.advBlock}>
              {product.advantages && (
                <div className={style.advantages}>
                  <div className={style.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={style.disadvantages}>
                  <div className={style.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(style.hr, style.hr2)} />
            <div className={style.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                appearance="ghost"
                arrow={isReviewOpened ? "down" : "right"}
                className={style.reviewButton}
                onClick={() => setIsReviewOpened((prev) => !prev)}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>

          <motion.div
            animate={isReviewOpened ? "visible" : "hidden"}
            variants={variants}
            initial="hidden"
          >
            <Card
              color="blue"
              className={style.reviews}
              ref={reviewRef}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
