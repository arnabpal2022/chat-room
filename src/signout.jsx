import React from "react";
import { handleLogout } from "./services/firebase";

const ButtonSignOut = () => {

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default ButtonSignOut;
