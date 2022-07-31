import React from "react";
import './styles.css'

export function Button({text, ...props}) {

  return (
    <button className="button" {...props}>
      {text}
    </button>
  );
}
