import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { AuthenticatedApp, UnauthenticatedApp } from "./main";

function App() {
  const { user } = useAuth();
  return (
    <div className="flex items-center h-screen">
      <div className="container my-10 montserrat">
        <h1 class="text-center montserrat font-bold text-5xl">💬 Chat Room</h1>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </div>
  );
}

export default App;
