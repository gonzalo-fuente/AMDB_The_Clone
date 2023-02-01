import { createContext, useEffect, useState } from "react";

export const FavContext = createContext(null);

const FavProvider = ({ children }) => {
  /* Get Favorites from localStorage */
  const getFavorites = () => {
    if (localStorage.getItem("favorites") == null) return [];
    const favString = localStorage.getItem("favorites");
    return JSON.parse(favString);
  };

  const [favorites, setFavorites] = useState(getFavorites());

  /* Save Favorites to localStorage */
  const saveFavorite = (favorite) => {
    if (!favorites || !favorites.some((item) => item.id === favorite.id)) {
      setFavorites((prevFavorites) => {
        if (!favorites) {
          return [favorite];
        } else {
          return [...prevFavorites, favorite];
        }
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /* Remove Favorites from localStorage */
  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => {
      return prevFavorites.filter((favorite) => favorite.id !== id);
    });
  };

  const value = {
    favorites,
    saveFavorite,
    removeFavorite,
  };

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};

export default FavProvider;
