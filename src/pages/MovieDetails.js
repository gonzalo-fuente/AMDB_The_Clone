import { useContext, useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../components/Loading";
import { TokenContext } from "../context/TokenContext";
import { axiosTMDB } from "../utils/axios";

const API_KEY = process.env.REACT_APP_API_KEY;

function MovieDetails() {
  const { token } = useContext(TokenContext);

  const [movie, setMovie] = useState(null);

  const query = new URLSearchParams(window.location.search);
  const movieID = query.get("movieID");

  const getMovie = async () => {
    try {
      const response = await axiosTMDB.get(
        `/movie/${movieID}?api_key=${API_KEY}`
      );
      if (response.status === 200) {
        setMovie(response.data);
      }
    } catch (err) {
      if (!err?.response) {
        swal({
          title: "No Server Response",
          icon: "error",
        });
      } else if (err.response?.status === 401) {
        /* Unauthorized */
        swal({
          title: err.response.data.status_message,
          icon: "error",
        });
      } else if (err.response?.status === 404) {
        /* Not found */
        swal({
          title: err.response.data.status_message,
          icon: "error",
        });
      } else {
        swal({
          title: "Request Error, try again later",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const stars = [];

  function printStars() {
    if (movie) {
      for (let i = 0; i < Math.floor(movie.vote_average); i++) {
        stars.push(<FaStar key={i} />);
      }
    }
  }
  printStars();

  return (
    <>
      {!token && <Redirect to="/" />}

      {!movie && <Loading />}

      {movie && (
        <section className="container py-10 flex-grow bg-gray-100 text-gray-600 body-font">
          <div className="mx-auto px-5 flex justify-center flex-wrap">
            <div className="lg:w-1/3 md:w-1/2 sm:w-2/3 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
              <img
                alt={movie.title}
                className="object-cover object-center h-full w-full"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            </div>
            <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-5xl title-font font-medium mb-3">
                    {movie.title}
                  </h2>
                  <div className="flex flex-wrap gap-5 mb-3">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold border-2 border-teal-600 text-teal-700 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed">{movie.overview}</p>
                </div>
              </div>
              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="flex flex-wrap gap-5 mb-4 text-2xl">
                  <span className="flex items-center text-teal-700">
                    {stars.map((star) => star)}
                    {Math.round(movie.vote_average) -
                    Math.floor(movie.vote_average) ? (
                      <FaStarHalfAlt />
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="text-gray-600">
                    {movie.vote_count} Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default MovieDetails;
