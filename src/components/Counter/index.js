import React from "react";

function Counter({ counter }) {
  return <p>{counter}</p>;
}

Counter.defaultProps = {
  counter: "Display counter here"
};

export default Counter;
