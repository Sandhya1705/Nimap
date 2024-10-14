import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
    setQuery("");
  }

  return (
    <nav className="w-full bg-prussian-blue text-xl text-blue-green py-3 px-4 lg:px-10 flex font-mono items-center justify-between border-b border-blue-green sticky z-50 top-0 ">
      <div className="w-1/5 min-w-fit py-2 border border-prussian-blue hidden lg:inline">
        MovieDb
      </div>
      <div className="navbar-right-mobile w-full flex items-center justify-end flex-col-reverse gap-4 lg:flex-row">
        <div className="navbar-right-links w-full flex items-center justify-evenly lg:justify-between  lg:mr-10 lg:max-w-96">
          <Link className="hover:text-white" to="/">
            Popular 
          </Link>
          <Link className="hover:text-white" to="/top-rated">
            Top-Rated 
          </Link>
          <Link className="hover:text-white" to="/upcoming">
            Upcoming 
          </Link>
        </div>

        <form
  className="border border-blue-green flex w-1/2 mx-auto" // Form width
  onSubmit={handleSearch}
>
  <input
    type="text"
    placeholder="Movie Name"
    value={query}
    onChange={(event) => setQuery(event.target.value)}
    className="text-prussian-blue bg-blue-green focus:outline-none p-2 w-2/3" // Input with original colors
  />
  <button
    className="text-prussian-blue bg-white hover:bg-[#3C3F42] px-3 py-2 w-1/3" // Adding hover effect
    type="submit"
  >
    Search
  </button>
</form>




      </div>
    </nav>
  );
}

export default Navbar;