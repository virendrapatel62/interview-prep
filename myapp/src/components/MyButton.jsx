import { forwardRef } from "react";

export const MyButton = forwardRef((props, ref) => {
  return (
    <div>
      <button ref={ref}>{props.children}</button>
    </div>
  );
});
