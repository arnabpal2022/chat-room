import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/auth";
import { useAuth } from "./hooks/useAuth.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./landing.jsx";
import { Chatroom } from "./Chatroom.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Landing/>}></Route>
        <Route path = "/room/:id" element={<Chatroom/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

function UnauthenticatedApp() {
  const { login } = useAuth();

  return (
    <div class="text-center">
      <h2 class="text-center text-lg my-5">Login to explore our Features</h2>
      <button type="button" class="login-with-google-btn bg-blue-50 border-black border-2 text-blue-950" onClick={login}>
        Sign in with Google
      </button>
    </div>
  );
}

export { AuthenticatedApp, UnauthenticatedApp };
