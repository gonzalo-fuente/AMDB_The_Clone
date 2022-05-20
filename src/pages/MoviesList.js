import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { axiosTMDB } from "../utils/axios";
import Movie from "../components/Movie";
import swal from "sweetalert";
import { TokenContext } from "../context/TokenContext";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { FavContext } from "../context/FavContext";

function MoviesList({ url, keyword = false, favs = false }) {
  const { token } = useContext(TokenContext);
  const { favorites } = useContext(FavContext);

  const [moviesList, setMoviesList] = useState([]);

  const location = useLocation();

  const getMovies = async () => {
    try {
      const response = await axiosTMDB.get(url);
      if (response.status === 200) {
        setMoviesList(response.data.results);
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
    if (url) {
      getMovies();
    } else {
      setMoviesList([...favorites]);
    }
  }, [location, favorites]);

  return (
    <>
      {!token && <Redirect to="/" />}

      {!moviesList && <Loading />}

      {moviesList && (
        <div className="container py-10 px-5 flex-grow bg-gray-100">
          {keyword && (
            <h3 className="text-2xl mb-4">
              Searh results for: <em>{keyword}</em>
            </h3>
          )}
          {keyword && !moviesList.length && (
            <h3 className="text-red-500 text-2xl mb-4">
              No results were found !
            </h3>
          )}
          {favs && !moviesList.length && (
            <h3 className="text-red-500 text-2xl mb-4">
              It's time to select Favorites... !
            </h3>
          )}

          <div className="grid justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7">
            {moviesList.length !== 0 &&
              moviesList.map((movie) => <Movie key={movie.id} movie={movie} />)}
          </div>
        </div>
      )}
    </>
  );
}

export default MoviesList;
