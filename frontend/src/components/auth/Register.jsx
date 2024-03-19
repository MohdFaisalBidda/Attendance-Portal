import React, { useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import axios from "axios";

function Register() {
  const [cred, setCred] = useState({ username: "", password: "" });
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (cred.password !== confirmPass) {
        toast.error("Password Mismatch");
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/register`,
          cred
        );
        if (res.status === 201) {
          navigate("/login");
          toast.success("User registered successfully!");
        } else {
          toast.error("Something Went Wrong");
        }
        setIsLoading(false);
        console.log("cred: ", cred);
      }
    } catch (error) {
      toast.error(error.response.data);
      console.log(error.response);
    } finally {
      setIsLoading(false);
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
              Create an account
            </h1>
            <form
              onSubmit={handleSubmit}
              class="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="text"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  onChange={(e) =>
                    setCred({ ...cred, username: e.target.value })
                  }
                  value={cred.username}
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
                  onChange={(e) =>
                    setCred({ ...cred, password: e.target.value })
                  }
                  value={cred.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
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
                  "Create an account"
                )}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  class="font-medium text-[#db2777] hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
