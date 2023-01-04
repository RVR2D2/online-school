import { Card } from "../Card/Card";

import { HhDataProps } from "./HhData.props";
import style from "./HhData.module.css";
import cn from "classnames";

import RateIco from "../../assets/icons/rateIco.svg";
import { priceRu } from "../../helpers/helpers";

export const HhData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HhDataProps): JSX.Element => {
  return (
    <div className={style.hh}>
      <Card className={style.count}>
        <div className={style.title}>Всего вакансий</div>
        <div className={style.countValue}>{count}</div>
      </Card>

      <Card className={style.salary}>
        <div>
          <div className={style.title}>Начальный</div>
          <div className={style.salaryValue}>{priceRu(juniorSalary)}</div>
          <div className={style.rate}>
            <RateIco className={style.filled} />
            <RateIco />
            <RateIco />
          </div>
        </div>

        <div>
          <div className={style.title}>Средний</div>
          <div className={style.salaryValue}>{priceRu(middleSalary)}</div>
          <div className={style.rate}>
            <RateIco className={style.filled} />
            <RateIco className={style.filled} />
            <RateIco />
          </div>
        </div>

        <div>
          <div className={style.title}>Профессионал</div>
          <div className={style.salaryValue}>{priceRu(seniorSalary)}</div>
          <div className={style.rate}>
            <RateIco className={style.filled} />
            <RateIco className={style.filled} />
            <RateIco className={style.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
