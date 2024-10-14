import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cast from "../../components/cast";

function useId() {
  return new URLSearchParams(useLocation().search);
}

function MovieDetail() {
  const id = useId().get("id");
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_key = "c45a857c193f6302f2b5061c3b85e743";
  const img_base_path = "https://image.tmdb.org/t/p/w500";

  async function fetchData(getId) {
    try {
      const [movieResponse, castResponse] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${getId}?api_key=${API_key}&language=en-US`
        ),
        fetch(`https://api.themoviedb.org/3/movie/${getId}/credits?api_key=${API_key}&language=en-US
`),
      ]);

      const movieData = await movieResponse.json();
      const castData = await castResponse.json();

      setMovie(movieData);
      if (castData.cast.length > 0) {
        setCast(castData.cast);
      }else{
        setCast(castData.crew)
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(id);
  }, [id]);

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
    <div className="w-full min-h-screen overflow-x-hidden overflow-y-auto bg-prussian-blue py-4  lg:p-8">
      <div className=" hidden xl:w-full xl:grid xl:grid-cols-2 relative">
        <div className="bg-black grid grid-cols-4 p-4 gap-4">
          <img
            src={`${img_base_path}${movie.poster_path}`}
            className="w-full"
          />
          <div className="col-span-3 ">
            <div className="font-mono text-blue-green w-full">
              <p className="text-5xl font-bold ">{movie.title}</p>
              <p className=" text-xs">&#40; {movie.original_title} &#41;</p>
            </div>
            <div className="font-mono text-lg py-2">
              <div className="flex items-center gap-1">
                <img src="/assets/star.svg" />
                <span className="text-blue-green">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="text-blue-green">{movie.release_date}</p>
              {movie.genres &&
                movie.genres.map((gen, i) => (
                  <span key={i} className="text-blue-green">
                    {gen.name}{" "}
                  </span>
                ))}
              <p className="text-blue-green">{movie.runtime} min</p>
            </div>
            <div className="grid grid-cols-2 text-prussian-blue text-center text-lg w-fit">
              <span className="bg-infra-red px-2">{movie.budget}&#36;</span>
              <span className="bg-caribbean-green px-2">
                {movie.revenue}&#36;
              </span>
            </div>
          </div>
          <div className="absolute bg-blue-green bottom-0 z-50 left-0 w-full text-prussian-blue font-semibold px-4 py-1">
            {movie.overview}
          </div>
        </div>
        <div className="bg-gradient-to-l from-gray-50 to-black  ">
          <img
            src={`${img_base_path}${movie.backdrop_path}`}
            className="w-full mix-blend-multiply \"
          />
        </div>
      </div>
      <div className="xl:hidden">
        <div className="flex items-center justify-center mb-4">
          <img src={`${img_base_path}${movie.poster_path}`} className="w-2/3" />
        </div>
        <div className="py-2 bg-crayola font-mono">
          <p className="text-center text-prussian-blue text-2xl">
            {movie.title}
          </p>
          <p className="text-center text-prussian-blue text-xs">
            &#40; {movie.original_title} &#41;
          </p>
        </div>
        <div className="font-mono text-lg text-center py-2">
          <p className="text-blue-green">{movie.release_date}</p>
          {movie.genres &&
            movie.genres.map((gen, i) => (
              <span key={i} className="text-blue-green">
                {gen.name}{" "}
              </span>
            ))}
          <p className="text-blue-green">{movie.runtime} min</p>
        </div>
        <div className="grid grid-cols-2 text-prussian-blue text-center text-lg">
          <span className="bg-infra-red">{movie.budget}&#36;</span>
          <span className="bg-caribbean-green">{movie.revenue}&#36;</span>
        </div>
        <div className="bg-blue-green">
          <p className="text-prussian-blue text-justify p-4 font-mono font-bold">
            {movie.overview}
          </p>
        </div>
      </div>
      <p className="py-4 text-blue-green font-mono text-2xl text-center lg:text-6xl">
        Cast
      </p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cast.map((actor, index) => (
          <Cast key={index} actor={actor} />
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;
