import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { axiosToken } from "../utils/axios";
import swal from "sweetalert";
import loginPicture from "../assets/authentication.svg";
import { TokenContext } from "../context/TokenContext";

function Login() {
  const history = useHistory();

  const { token, saveToken } = useContext(TokenContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/i;

    if (user.email === "" || user.password === "") {
      swal({
        title: "All fields are required",
        icon: "error",
      });
      return;
    }

    if (user.email !== "" && !emailRegex.test(user.email)) {
      swal({
        title: "Please enter a valid email address",
        icon: "error",
      });
      return;
    }

    if (user.password !== "" && user.password.length < 4) {
      swal({
        title: "Password must be 4 characters long",
        icon: "error",
      });
      return;
    }

    if (user.email !== "challenge@alkemy.org" || user.password !== "react") {
      swal({
        title: "Invalid credentials",
        icon: "error",
      });
      return;
    }

    try {
      const response = await axiosToken.post("/", user);
      saveToken(response?.data.token);
      swal({
        title: "Login Succesfull",
        icon: "success",
      });
      setUser({
        email: "",
        password: "",
      });
      history.push("/list");
    } catch (err) {
      if (!err?.response) {
        swal({
          title: "No Server Response",
          icon: "error",
        });
      } else if (err.response?.status === 400) {
        swal({
          title: "Missing Username or Password",
          icon: "error",
        });
      } else if (err.response?.status === 401) {
        swal({
          title: "Unauthorized",
          icon: "error",
        });
      } else {
        swal({
          title: "Login Failed",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      {token && <Redirect to="/list" />}

      <div className="container py-10 flex justify-center items-center flex-grow bg-gray-100">
        {/* <!-- Row --> */}
        <div className="flex w-11/12 md:w-full lg:w-9/12">
          {/* <!-- Col --> */}
          <div className="hidden md:flex md:justify-center md:items-center rounded-l-lg">
            <img src={loginPicture} alt="login" />
          </div>
          {/* <!-- Col --> */}
          <div className="w-full mx-auto bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">
              Log in to your account
            </h3>
            <form
              onSubmit={handleSubmit}
              className="px-8 pt-6 pb-8 bg-white rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="email"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-teal-600 rounded-full hover:bg-teal-800 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
