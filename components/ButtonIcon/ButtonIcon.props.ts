import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import up from "../../assets/icons/up.svg";
import close from "../../assets/closePrimary.svg";
import burger from "../../assets/burgerPrimary.svg";

export const icons = {
  up,
  close,
  burger,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconName;
  appearance: "primary" | "white";
}
