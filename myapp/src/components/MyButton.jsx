import { useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";

export const MyButton = forwardRef((props, ref) => {
  return (
    <div>
      <button ref={ref}>{props.children}</button>
    </div>
  );
});
