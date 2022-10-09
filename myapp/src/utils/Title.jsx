import { Fragment, useEffect, useLayoutEffect } from "react";
export const Title = ({ children }) => {
  useLayoutEffect(() => {
    document.title = children;
  }, []);

  return <Fragment />;
};
