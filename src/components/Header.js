import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FavContext } from "../context/FavContext";
import { TokenContext } from "../context/TokenContext";
import Hamburguer from "./Hamburguer";
import Search from "./Search";

function Header() {
  const { token, clearToken } = useContext(TokenContext);
  const { favorites } = useContext(FavContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-teal-600 px-12 py-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-bold text-4xl tracking-tight">AMDb</span>
        </div>
        <div className="block md:hidden">
          <Hamburguer isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
        <div
          className={`${
            isMenuOpen
              ? token && favorites?.length !== 0
                ? "h-48"
                : token || favorites?.length !== 0
                ? "h-36"
                : "h-24"
              : "h-0"
          } w-full transition-all ease-out duration-500 md:transition-none md:h-0 md:w-auto md:flex-grow md:flex md:items-center`}
        >
          <ul className="flex flex-col mt-5 mx-4 md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/list"
                className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Trending List
              </Link>
            </li>
            {favorites?.length !== 0 && (
              <li>
                <Link
                  to="/favorites"
                  className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
                >
                  Favorites
                </Link>
              </li>
            )}
            {token && (
              <li>
                <button
                  className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
                  onClick={clearToken}
                >
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
        {token && <Search isMenuOpen={isMenuOpen} />}
      </nav>
    </header>
  );
}

export default Header;
