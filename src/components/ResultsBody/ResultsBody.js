import { react, useEffect, useState } from "react";
import styles from "./ResultsBody.module.css";
import Book from "./Book";

const ResultsBody = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedBooks, setFetchedBooks] = useState([]);
  let numberOfFilters = 0;
  useEffect(() => {
    // Randomizing Keyword used for Fetching Books
    const randomIndex = Math.round(Math.random() * 9);
    const bookSearchTerms = [
      "business",
      "java",
      "finance",
      "trading",
      "markets",
      "nature",
      "motivation",
      "management",
      "Go",
      "India",
    ];
    fetch(
      // Fetching ~40 PAID, ENGLISH BOOKS
      `https://www.googleapis.com/books/v1/volumes?q=${bookSearchTerms[randomIndex]}&filter=paid-ebooks&printType=BOOKS&maxResults=40&langRestrict=english`
    )
      .then((response) => response.json())
      .then((data) => {
        // Mapping through received data and extracting relevant info.
        const dataReceived = data.items.map((item) => {
          // I'm forced to do some conditional filtering on received data
          // to eliminate errors due to incorrect json data.
          return {
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors
              ? item.volumeInfo.authors.join(" , ")
              : "Unknown",
            genre: Array.isArray(item.volumeInfo.categories)
              ? item.volumeInfo.categories[0]
              : "Unknown",
            rating: Math.round(Math.random() * 4 + 1),
            price: +`${
              item.saleInfo.saleability === "NOT_FOR_SALE" ||
              item.saleInfo.retailPrice.amount === 0
                ? Math.round(Math.random() * 1000)
                : item.saleInfo.retailPrice.amount
            }`,
            image: item.volumeInfo.imageLinks.thumbnail,
          };
        });

        // Creating Alphabetical Sort of genres for 'Genre Filter'
        const uniqueGenres = new Set();
        dataReceived.forEach((book) => {
          uniqueGenres.add(book.genre);
        });

        // Pull genre data into App & then pass to FiltersPopup Component
        props.pullGenres(Array.from(uniqueGenres).sort());

        setFetchedBooks(dataReceived);
        setIsLoading(false);
      });
  }, []);

  /** FILTERS & SEARCH ARE BEING APPLIED HERE */
  console.log(props.filters);

  // Extracted filters data via Object Destructuring
  let { priceMax, priceMin, ratingMax, ratingMin, selectedGenre } =
    props.filters;

  console.log(priceMax);
  console.log(priceMin);
  console.log(ratingMax);
  console.log(ratingMin);
  console.log(isNaN(selectedGenre));

  const isValid = (val) => {
    if (val === 0 || val === "" || val === undefined) {
      return false;
    }
    return true;
  };

  // console.log(isValid(priceMax));
  // console.log(isValid(priceMin));
  // console.log(isValid(ratingMax));
  // console.log(isValid(ratingMin));
  console.log(isValid(selectedGenre));

  const filteredAndSearchedBooks = fetchedBooks
    .filter((book) => {
      // console.log(book);
      return (
        book.title.toLowerCase().includes(props.searchText) ||
        book.author.toLowerCase().includes(props.searchText)
      );
    })
    .filter((book) => {
      // ONLY Price Filter
      if (
        isValid(priceMax) &&
        isValid(priceMin) &&
        !isValid(ratingMin) &&
        !isValid(ratingMax) &&
        !isValid(selectedGenre)
      ) {
        numberOfFilters = 1;
        return book.price >= priceMin && book.price <= priceMax;
      }
      // // ONLY Rating Filter
      else if (
        !isValid(priceMax) &&
        !isValid(priceMin) &&
        isValid(ratingMin) &&
        isValid(ratingMax) &&
        !isValid(selectedGenre)
      ) {
        numberOfFilters = 1;
        return book.rating <= ratingMax && book.rating >= ratingMin;
      }
      // ONLY Genre Filter
      else if (
        !isValid(priceMax) &&
        !isValid(priceMin) &&
        !isValid(ratingMin) &&
        !isValid(ratingMax) &&
        isValid(selectedGenre)
      ) {
        numberOfFilters = 1;
        return book.genre === selectedGenre;
      }
      // Price & Rating Filter
      else if (
        isValid(priceMax) &&
        isValid(priceMin) &&
        isValid(ratingMin) &&
        isValid(ratingMax) &&
        !isValid(selectedGenre)
      ) {
        numberOfFilters = 2;
        return (
          book.rating <= ratingMax &&
          book.rating >= ratingMin &&
          book.price <= priceMax &&
          book.price >= priceMin
        );
      }
      // Price & Genre Filter
      else if (
        isValid(priceMax) &&
        isValid(priceMin) &&
        !isValid(ratingMin) &&
        !isValid(ratingMax) &&
        isValid(selectedGenre)
      ) {
        numberOfFilters = 2;
        return (
          book.genre === selectedGenre &&
          book.price <= priceMax &&
          book.price >= priceMin
        );
      }
      // Rating & Genre Filter
      else if (
        !isValid(priceMax) &&
        !isValid(priceMin) &&
        isValid(ratingMin) &&
        isValid(ratingMax) &&
        isValid(selectedGenre)
      ) {
        numberOfFilters = 2;
        return (
          book.genre === selectedGenre &&
          book.rating <= ratingMax &&
          book.rating >= ratingMin
        );
      }
      // All filters applied at once
      else if (
        isValid(priceMax) &&
        isValid(priceMin) &&
        isValid(ratingMin) &&
        isValid(ratingMax) &&
        isValid(selectedGenre)
      ) {
        numberOfFilters = 3;
        return (
          book.genre === selectedGenre &&
          book.price <= priceMax &&
          book.price >= priceMin &&
          book.rating >= ratingMin &&
          book.rating <= ratingMax
        );
      } else {
        numberOfFilters = 0;
        return true; // no filter
      }
    })
    .map((book, i) => {
      return <Book data={book} key={i} />;
    });
  props.getFiltersNum(numberOfFilters);
  if (isLoading) {
    return (
      <div className={styles.ResultsBody}>
        <div className={styles.Loading}>
          <p>Loading Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ResultsBody}>
      <div className={styles.Results}>{filteredAndSearchedBooks}</div>
    </div>
  );
};

export default ResultsBody;
