import React from "react";

import css from "./Button.module.css";

function Button({ text, handleClick }) {
  return (
    <button onClick={() => handleClick()} className={css.button}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "Press me.",
  handleClick: () => console.log("You have pressed me.")
};

export default Button;
