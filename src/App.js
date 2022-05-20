import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TokenProvider from "./context/TokenContext";
import FavProvider from "./context/FavContext";
import { useLocation } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const location = useLocation();
  let url;

  switch (location.pathname) {
    case "/list":
      url = `/trending/movie/week?api_key=${API_KEY}`;
      break;
    case "/search":
      const query = new URLSearchParams(window.location.search);
      const keyword = query.get("keyword");
      url = `search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${keyword}`;
      break;
    case "/favorite":
      url = null;
      break;
  }

  return (
    <>
      <TokenProvider>
        <FavProvider>
          <Header />

          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              path="/list"
              render={(props) => <MoviesList url={url} {...props} />}
            />
            <Route
              path="/search"
              render={(props) => (
                <MoviesList url={url} keyword={true} {...props} />
              )}
            />
            <Route
              path="/favorites"
              render={(props) => (
                <MoviesList url={url} favs={true} {...props} />
              )}
            />
            <Route path="/details" component={MovieDetails} />
          </Switch>
        </FavProvider>
      </TokenProvider>

      <Footer />
    </>
  );
}

export default App;
