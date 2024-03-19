import axios from "axios";
import React, { useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "react-toastify";

function PasswordReset() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resetCred, setResetCred] = useState({
    username: "",
    currPassword: "",
    newPassword: "",
  });

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/reset`,
        resetCred
      );

      if (res.status === 200) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-black h-screen">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link
          to={"/login"}
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <FaCalendarDays className="w-8 h-8 mr-2" color="#db2777" />
          Attendance Portal
        </Link>
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            onSubmit={handleReset}
            class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
          >
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                value={resetCred.username}
                onChange={(e) =>
                  setResetCred({ ...resetCred, username: e.target.value })
                }
                name="username"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Sam"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Current Password
              </label>
              <input
                type="password"
                value={resetCred.currPassword}
                onChange={(e) =>
                  setResetCred({ ...resetCred, currPassword: e.target.value })
                }
                name="currPassword"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New password
              </label>
              <input
                type="password"
                value={resetCred.newPassword}
                onChange={(e) =>
                  setResetCred({ ...resetCred, newPassword: e.target.value })
                }
                name="newPassword"
                id="new-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              class="w-full text-white bg-[#db2777] hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {isLoading ? (
                <LuLoader2 className="animate-spin w-5 h-5 mx-auto" />
              ) : (
                "Reset password"
              )}
            </button>
          </form>
          <div className="flex justify-between mt-5">
            <Link
              to={"/login"}
              class="text-sm font-medium text-[#db2777] hover:underline dark:text-primary-500"
            >
              Login Here
            </Link>
            <Link
              to={"/register"}
              class="text-sm font-medium text-[#db2777] hover:underline dark:text-primary-500"
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PasswordReset;
