import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import axios from "axios";
import { getToken } from "../utils/localstorage";
import { LuLoader2 } from "react-icons/lu";

function Dashboard() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const token = getToken();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/dashboard/users/`,
          {
            headers: {
              token: `Bearer ${token.token}`,
            },
          }
        );
        setUsersData(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [token.token]);

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div>
      <DashboardNavbar />
      <section class=" p-3 sm:p-5">
        <div class="mx-auto px-4 lg:px-12">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div class="w-full md:w-1/2">
                <form class="flex items-center">
                  <label for="simple-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search Username"
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th class="px-4 py-3">Username</th>
                    <th class="px-4 py-3">Date & Status</th>
                  </tr>
                </thead>
                {loading ? (
                  <td className="flex justify-end items-center w-full h-40">
                    <LuLoader2 className="animate-spin w-16 h-16" />
                  </td>
                ) : (
                  <tbody>
                    {usersData
                      .filter(
                        (user) =>
                          user.username
                            .toLowerCase()
                            .includes(search.toLowerCase()) &&
                          user.username.toLowerCase() !== "admin" 
                      )
                      .map((item) => (
                        <>
                          <tr class="border-b dark:border-gray-700">
                            <td
                              class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xl"
                            >
                              {item.username}
                            </td>
                            {item.attendance
                              .map((it) => (
                                <tr>
                                  <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xl">
                                    {formatDate(it.date)}
                                  </td>
                                  <td
                                    class={`px-4 py-3 font-medium whitespace-nowrap text-xl ${
                                      it.status === "present" &&
                                      "dark:text-green-500 text-green-500"
                                    } ${
                                      it.status === "absent" &&
                                      "dark:text-red-500 text-red-500"
                                    }`}
                                  >
                                    {it.status}
                                  </td>
                                </tr>
                              ))}
                          </tr>
                        </>
                      ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
