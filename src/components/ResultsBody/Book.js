import react from "react";
import styles from "./Book.module.css";

const Book = (props) => {
  // console.log(props);
  return (
    <div className={styles.Book}>
      <div>
        <img className={styles.image} src={`${props.data.image}`} />
      </div>
      <div className={styles.bookinfo}>
        <ul>
          <li>
            <span className={styles.Span}>Title - </span>
            <span className={styles.Data}>{props.data.title}</span>
          </li>
          <li>
            <span className={styles.Span}>Author - </span>{" "}
            <span className={styles.Data}>{props.data.author}</span>
          </li>
          <li>
            <span className={styles.Span}>Genre - </span>{" "}
            <span className={styles.Data}>{props.data.genre}</span>
          </li>
          <li>
            <span className={styles.Span}>Rating - </span>
            <span className={styles.Data}>{props.data.rating}</span>
          </li>
          <li>
            <span className={styles.Span}>Price - </span>
            <span className={styles.Data}> Rs. {props.data.price}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Book;
