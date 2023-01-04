import { useState } from "react";
import axios from "axios";
import { GetStaticProps } from "next";

import { Button, Htag, Input, P, Rating, Tag, Textarea } from "../components";
import { withLayout } from "../layout/Layout";

import { MenuItem } from "../interfaces/menu.interface";

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h1">Text</Htag>z
      <Button appearance={"primary"} children="Кнопка" arrow={"right"} />
      <Button appearance={"ghost"} children="Кнопка" arrow={"right"} />
      <P children={"TEst text component Advantages"} />
      <Tag size="s" children="Маленький" />
      <Tag size="s" children="Большой" color="red" />
      <Tag size="s" children="Большой" color="grey" />
      <Tag size="s" children="Большой" color="green" />
      <Tag size="s" children="Большой" color="primary" />
      <Rating rating={rating} isEditable setRating={setRating} />
      <Input placeholder="Text" />
      <Textarea placeholder="TEXT" />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory,
    }
  );
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
