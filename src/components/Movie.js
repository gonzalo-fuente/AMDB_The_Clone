import { useContext, useState } from "react";
import { FavContext } from "../context/FavContext";
import { FaChevronCircleRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Movie({ movie }) {
  const { favorites, saveFavorite, removeFavorite } = useContext(FavContext);
  const { id, title, overview, poster_path, vote_average } = movie;

  const [isFavorite, setIsFavorite] = useState(
    favorites?.some((item) => item.id === id)
  );

  const handleFavorites = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      saveFavorite(movie);
    }
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <div className="bg-white relative rounded-lg border shadow-md max-w-xs overflow-hidden">
      <button
        className="absolute right-2 top-2 bg-white opacity-70 p-2 rounded-full hover:bg-teal-100"
        onClick={handleFavorites}
      >
        {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </button>
      <img
        className="h-auto w-full object-contain"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
      />
      <div className="p-3">
        <span className="text-sm text-primary">Rating: {vote_average}</span>
        <h3 className="font-semibold text-xl leading-6 text-gray-700 my-2">
          {title}
        </h3>
        <p className="paragraph-normal text-gray-600 h-full">{overview}</p>
        <Link
          to={`/details?movieID=${id}`}
          className="mt-3 flex justify-end items-center gap-1"
        >
          Read More <FaChevronCircleRight className="inline" />
        </Link>
      </div>
    </div>
  );
}

export default Movie;
