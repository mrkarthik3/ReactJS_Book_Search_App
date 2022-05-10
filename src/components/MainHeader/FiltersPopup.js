import react, { useState } from "react";
import styles from "./FiltersPopup.module.css";

const FiltersPopup = (props) => {
  const [error, setError] = useState(false);

  // const priceMin = useRef();
  // const priceMax = useRef();
  // const ratingMin = useRef();
  // const ratingMax = useRef();
  // const selectedGenre = useRef();

  let [priceMin, setPriceMin] = useState();
  let [priceMax, setPriceMax] = useState();
  let [ratingMin, setRatingMin] = useState();
  let [ratingMax, setRatingMax] = useState();
  let [selectedGenre, setSelectedGenre] = useState();

  const options = props.genres.map((genre, i) => {
    return <option key={i}>{genre}</option>;
  });
  const setpriceMinHandler = (event) => {
    setPriceMin(event.target.value);
  };
  const setpriceMaxHandler = (event) => {
    setPriceMax(event.target.value);
  };
  const ratingMinHandler = (event) => {
    setRatingMin(event.target.value);
  };
  const ratingMaxHandler = (event) => {
    setRatingMax(event.target.value);
  };
  const selectedGenreHandler = (event) => {
    setSelectedGenre(event.target.value);
  };
  const handleFilterApply = (event) => {
    event.preventDefault();
    // storing data
    const data = {
      priceMin: priceMin,
      priceMax: priceMax,
      ratingMin: ratingMin,
      ratingMax: ratingMax,
      selectedGenre,
      // priceMin: +priceMin.current.value,
      // priceMax: +priceMax.current.value,
      // ratingMin: +ratingMin.current.value,
      // ratingMax: +ratingMax.current.value,
      // selectedGenre: selectedGenre.current.value,
    };
    console.log(data);
    if (+data.priceMax < +data.priceMin || +data.ratingMax < +data.ratingMin) {
      setError(true);
    } else {
      props.getFilterData(data);
      setError(false);
    }
  };
  const resetHandler = (event) => {
    // priceMin.current.value = "";
    // priceMax.current.value = "";
    // ratingMin.current.value = "";
    // ratingMax.current.value = "";
    // selectedGenre.current.value = "";
    setPriceMax("");
    setPriceMin("");
    setRatingMax("");
    setRatingMin("");
    setSelectedGenre("");
    props.getFilterData({
      priceMin,
      priceMax,
      ratingMin,
      ratingMax,
      selectedGenre,
    });
    setError(false);
  };
  return (
    <form className={styles.FiltersPopup} onSubmit={handleFilterApply}>
      {error && <h3>Max. is less than Min. !!</h3>}
      <div className={styles.filter}>
        <p>Filter by Price: </p>
        <label>Min:</label>
        <input
          type="number"
          min="1"
          step="1"
          // ref={priceMin}
          onChange={setpriceMinHandler}
          value={priceMin}
          // required
        />
        <label>Max:</label>
        <input
          type="number"
          min="1"
          step="1"
          // ref={priceMax}
          onChange={setpriceMaxHandler}
          value={priceMax}
          // required
        />
      </div>
      <div className={styles.filter}>
        <p>Filter by Rating: ( 1 - 5 ) </p>
        <label>Min:</label>
        <input
          type="number"
          step="1"
          min="1"
          max="4"
          // ref={ratingMin}
          onChange={ratingMinHandler}
          value={ratingMin}
          // required
        />
        <label>Max:</label>
        <input
          type="number"
          step="1"
          min="2"
          max="5"
          // ref={ratingMax}
          onChange={ratingMaxHandler}
          value={ratingMax}
          // required
        />
      </div>
      <br />
      <div className={styles.filter}>
        <label>Filter by Genre:</label>
        <select
          // ref={selectedGenre}
          onChange={selectedGenreHandler}
          value={selectedGenre}
        >
          <option></option>
          {options}
        </select>
      </div>
      <button>APPLY</button>
      <button onClick={resetHandler}>RESET</button>
      <button onClick={props.hideFilters}>CLOSE</button>
    </form>
  );
};

export default FiltersPopup;
