import react, { useState } from "react";
import styles from "./App.module.css";
import MainHeader from "./components/MainHeader/MainHeader";
import ResultsBody from "./components/ResultsBody/ResultsBody";
import Footer from "./components/Footer/Footer";

function App() {
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchText, setSearchText] = useState("");
  let [entriesPerPage, setEntriesPerPage] = useState("All");
  let [noOfFilters, setNoOfFilters] = useState(0);
  let [pageNum, setPageNum] = useState(1);

  const pullGenres = (genreData) => {
    // console.log(genreData);
    setGenres(genreData);
  };
  const pullFilters = (filtersApplied) => {
    // console.log(filtersApplied);
    setFilters(filtersApplied);
  };
  const pullSearchText = (searchText) => {
    // console.log(searchText.toLowerCase());
    setSearchText(searchText.toLowerCase());
  };
  const pullEntriesPerPage = (entries) => {
    // console.log(entries);
    setEntriesPerPage(+entries);
    setPageNum(1);
  };
  const pullNoOfFilters = (number) => {
    // console.log(number);
    setNoOfFilters(number);
  };

  const pageNumber = (num) => {
    console.log("pageNum before : ", pageNum);
    setPageNum(() => num + pageNum);
    console.log("pageNum after: ", num + pageNum);
  };
  return (
    <div className={styles.App}>
      <h2>Book Search App</h2>
      <MainHeader
        genres={genres}
        pullFilters={pullFilters}
        pullSearchText={pullSearchText}
        filtersNumber={noOfFilters}
      />
      <ResultsBody
        pullGenres={pullGenres}
        filters={filters}
        searchText={searchText}
        getFiltersNum={pullNoOfFilters}
        entries={entriesPerPage}
        pageNo={pageNum}
      />
      <Footer
        pullEntries={pullEntriesPerPage}
        pullPageNumber={pageNumber}
        pageNo={pageNum}
      />
    </div>
  );
}

export default App;
