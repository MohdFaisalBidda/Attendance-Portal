import React, { useContext, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";
import { UserContext } from "../../context/UserProvider";
import { Link } from "react-router-dom";

function Login() {
  const [cred, setCred] = useState({ username: "", password: "" });
  const { login, isLoading } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(cred);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-black">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link
          to={"/login"}
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <FaCalendarDays className="w-8 h-8 mr-2" color="#db2777" />
          Attendance Portal
        </Link>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
            </h1>
            <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                 value={cred.username}
                 onChange={(e) =>
                   setCred({ ...cred, username: e.target.value })
                 }
                  type="text"
                  name="username"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Sam"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                 value={cred.password}
                 onChange={(e) =>
                   setCred({ ...cred, password: e.target.value })
                 }
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="flex items-center justify-end">
                <Link
                  to={"/reset"}
                  class="text-sm font-medium text-[#db2777] hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-[#db2777] hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? (
                  <LuLoader2 className="animate-spin w-5 h-5 mx-auto" />
                ) : (
                  "Login"
                )}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/register"}
                  class="font-medium text-[#db2777] hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
