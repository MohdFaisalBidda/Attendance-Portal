import React, { useContext } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { UserContext } from "../context/UserProvider";

function DashboardNavbar() {
  const { logout } = useContext(UserContext);
  return (
    <header>
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-4 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center">
          <div className="flex items-end justify-center">
            <FaCalendarDays className="w-8 h-8 mr-2" color="#db2777" />
            <span class="text-xl font-semibold whitespace-nowrap dark:text-white">
              Admin Portal
            </span>
          </div>
          <div class="flex items-center">
            <button
              onClick={logout}
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 hover:text-[#db2777] rounded-lg text-xl font-semibold px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default DashboardNavbar;
