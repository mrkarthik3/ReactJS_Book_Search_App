import { react, useState } from "react";
import styles from "./MainHeader.module.css";
import Button from "../UI/Button/Button";
import SearchBox from "../UI/Searchbox/SearchBox";
import FiltersPopup from "./FiltersPopup";

const MainHeader = (props) => {
  const [showFilters, setShowFilters] = useState(false);
  const displayFilters = () => {
    setShowFilters(true);
  };
  const hideFilters = () => {
    setShowFilters(false);
  };
  const getFilterData = (appliedFilters) => {
    props.pullFilters(appliedFilters);
  };
  const getSearchData = (searchedText) => {
    props.pullSearchText(searchedText);
  };
  return (
    <div className={styles.MainHeader}>
      <Button buttonText="Filters" displayFilters={displayFilters} />
      <span className={styles.FiltersNum}>
        {" "}
        Filters Applied : {props.filtersNumber}
      </span>
      {showFilters && (
        <FiltersPopup
          hideFilters={hideFilters}
          genres={props.genres}
          getFilterData={getFilterData}
        />
      )}
      <SearchBox
        placeholder="LIVE Search by Title & Author"
        pullSearchText={getSearchData}
      />
    </div>
  );
};

export default MainHeader;
