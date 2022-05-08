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
          <li>Title: {props.data.title}</li>
          <li>Author: {props.data.author}</li>
          <li>Genre: {props.data.genre}</li>
          <li>Rating: {props.data.rating}</li>
          <li>Price: Rs. {props.data.price}</li>
        </ul>
      </div>
    </div>
  );
};

export default Book;
