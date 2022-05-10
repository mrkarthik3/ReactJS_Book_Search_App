import react from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={styles.Button}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;
