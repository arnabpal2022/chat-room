import React from "react";
import { loginWithGoogle } from "../services/firebase";

/* `const AuthContext = React.createContext();` is creating a new context object called `AuthContext`.
Context provides a way to pass data through the component tree without having to pass props down
manually at every level. The `createContext()` function returns an object with two properties:
`Provider` and `Consumer`. The `Provider` component is used to provide the context value to its
descendants, and the `Consumer` component is used to access the context value within a component. */
const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [user, setUser] = React.useState(null);

  /**
   * The function `login` logs in a user with Google and sets the user if successful, otherwise it
   * displays an alert.
   */
  const login = async () => {
    const user = await loginWithGoogle();

    if (!user) {
      alert("Please Try Again");
    }

    setUser(user);
  };

  const value = { user, login };

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };
