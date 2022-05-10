import React, { useRef } from "react";
import styles from "./Footer.module.css";
import Button from "../UI/Button/Button";

const Footer = (props) => {
  const numOfResults = useRef();
  const changeHandler = () => {
    props.pullEntries(numOfResults.current.value);
  };
  const handlePrevClick = () => {
    props.pullPageNumber(-1);
    console.log("Prev clicked");
  };
  const handleNextClick = () => {
    props.pullPageNumber(1);
    console.log("Next clicked");
  };
  return (
    <React.Fragment>
      <div className={styles.Footer}>
        <div className={styles.flex_footer + " " + styles.item1}>
          <select ref={numOfResults} onChange={changeHandler}>
            <option>All</option>
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
          <p>Entries per page</p>
        </div>
        <div className={styles.flex_footer + " " + styles.item2}>
          <button onClick={handlePrevClick}>Prev</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
