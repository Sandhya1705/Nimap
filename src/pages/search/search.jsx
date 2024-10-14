import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Movie from "../../components/movie";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get("query");
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_key = "c45a857c193f6302f2b5061c3b85e743";

  async function fetchMovies(getKey, getQuery) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${getKey}&language=en-US&query=${getQuery}&page=${pageCount}`
      );
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
        setPages(data.total_pages);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(API_key, query);
  }, [query,pageCount]);

  function handlePreviousPagination() {
    if (pageCount >= 2) {
      setPageCount(pageCount - 1);
    }
  }

  function handleNextPagination() {
    if (pageCount <= pages - 1) {
      setPageCount(pageCount + 1);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col bg-prussian-blue">
        <span className="loader"></span>
      </div>
    );
  }

  if (error !== null) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col bg-prussian-blue">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-x-hidden overflow-y-auto bg-prussian-blue p-4 lg:px-8">
      <div className="font-mono text-blue-green pb-4">
        Page {pageCount} of {pages}
      </div>
      <div className="movies-container grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
        {movies
          ? movies.map((movie, index) => <Movie key={index} movie={movie} />)
          : "movies not found"}
      </div>
      <div className="flex items-center justify-center py-6">
        {pageCount >= 2 && (
          <button className="p-4" onClick={handlePreviousPagination}>
            <img src="/assets/b_arrow.svg" />
          </button>
        )}
        <button className="px-4 py-2 bg-blue-green text-prussian-blue">
          {pageCount}
        </button>
        <button className="p-4" onClick={handleNextPagination}>
          <img src="/assets/f_arrow.svg" />
        </button>
      </div>
    </div>
  );
}

export default Search;
