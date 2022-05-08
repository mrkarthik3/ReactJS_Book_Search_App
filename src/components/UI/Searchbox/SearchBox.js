import react, { useRef, useState } from "react";
import styles from "./SearchBox.module.css";
import img from "./icons8-search-50.png";

const SearchBox = (props) => {
  const [liveText, setLiveText] = useState("");
  // const searchText = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(searchText.current.value);
    // props.pullSearchText(searchText.current.value);
    // disabled normal search.
  };

  const handleLiveText = (event) => {
    setLiveText(event.target.value);
    props.pullSearchText(event.target.value.trim());
  };
  return (
    <form className={styles.SearchBox} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={props.placeholder}
        // ref={searchText}
        value={liveText}
        onChange={handleLiveText}
      />
      <img src={img} onClick={handleSubmit} />
    </form>
  );
};

export default SearchBox;
