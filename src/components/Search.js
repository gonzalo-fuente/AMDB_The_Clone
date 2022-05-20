import { FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import swal from "sweetalert";

function Search({ isMenuOpen }) {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const keyword = event.currentTarget.keyword.value.trim();

    if (keyword.length < 3) {
      swal({
        title: "You need to write at least 3 characters.",
        icon: "error",
      });
    } else {
      event.currentTarget.keyword.value = "";
      history.push(`/search?keyword=${keyword}`);
    }
  };
  return (
    <form
      className={`${
        isMenuOpen ? "" : "hidden"
      } mt-3 w-full relative md:w-auto md:block md:mt-0`}
      onSubmit={handleSubmit}
    >
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <FaSearch />
      </div>
      <input
        type="text"
        name="keyword"
        className="block p-2 pl-10 w-full text-gray-800 bg-gray-100 rounded-lg border border-gray-300 sm:text-sm focus:ring-teal-500 focus:border-teal-500"
        placeholder="Search..."
      />
    </form>
  );
}

export default Search;
