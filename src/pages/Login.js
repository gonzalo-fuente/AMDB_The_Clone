import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { axiosToken } from "../utils/axios";
import { TokenContext } from "../context/TokenContext";

import Loading from "../components/Loading";

import swal from "sweetalert";
import loginPicture from "../assets/authentication.svg";

function Login() {
  const history = useHistory();

  const { token, saveToken } = useContext(TokenContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    if (isLogin) {
      /* LOGIN REQUEST */
      setIsLoading(true);
      try {
        const response = await axiosToken.post("/auth", {
          user: user.email,
          password: user.password,
        });
        saveToken(response?.data.accessToken);
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
            title: "Username or Password Incorrect",
            icon: "error",
          });
        } else {
          swal({
            title: "Login Failed",
            icon: "error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      /* REGISTER REQUEST */
      setIsLoading(true);
      try {
        const response = await axiosToken.post("/register", {
          user: user.email,
          password: user.password,
        });
        swal({
          title: `User ${user.email} created Succesfully`,
          icon: "success",
        });
        setUser({
          email: "",
          password: "",
        });
        setIsLogin(true);
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
        } else if (err.response?.status === 409) {
          swal({
            title: "User already exist!",
            icon: "error",
          });
        } else {
          swal({
            title: "Server Error, try again later",
            icon: "error",
          });
        }
      } finally {
        setIsLoading(false);
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
              {isLogin ? "Log in to" : "Create"} your account
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
                  {isLogin ? "Log In" : "Sign In"}
                </button>
                {isLoading && (
                  <div className="mt-3">
                    <Loading />
                  </div>
                )}
              </div>
              <p className="mt-2">
                {isLogin ? "New to AMDB? " : "Return to "}
                <button
                  type="button"
                  className="text-teal-600 underline"
                  onClick={() => setIsLogin((prevState) => !prevState)}
                >
                  {isLogin ? "Sign Up" : "Login page"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
