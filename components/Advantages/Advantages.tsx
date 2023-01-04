import cn from "classnames";

import { AdvantagesProps } from "./Advantages.props";
import style from "./Advantages.module.css";

import CheckIco from "../../assets/icons/check.svg";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages.map((a) => (
        <div key={a._id} className={style.advantage}>
          <CheckIco />
          <div className={style.title}>{a.title}</div>

          <hr className={style.vline} />
          <div> {a.description}</div>
        </div>
      ))}
    </>
  );
};
