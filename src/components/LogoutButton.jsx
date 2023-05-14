import React from "react";

import { useStateContext } from "../contexts/ContextProvider";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import { useNavigate } from "react-router-dom";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    console.log("thoat");
    navigate("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
