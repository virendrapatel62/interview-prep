import { Fragment, useEffect, useRef } from "react";
import { Title } from "../utils/Title";
import { MyButton } from "./MyButton";

export const ForwardRef = () => {
  const ref = useRef();

  console.log(ref.current);

  useEffect(() => {
    console.log(ref.current);
  }, []);
  return (
    <Fragment>
      <Title>Forword Ref Example</Title>
      <MyButton ref={ref}>ForWord Ref Example</MyButton>
    </Fragment>
  );
};
