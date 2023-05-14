import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-24">
    Welcome to admin panel !!!!
    </div>
  );
};

export default Ecommerce;
