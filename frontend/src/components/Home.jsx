import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

function Home() {
  const { logout } = useContext(UserContext);
  return (
    <div>
      Home Home
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Home;
