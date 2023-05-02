import { useContext } from "react";
import "./App.css";
import MainHeader from "./components/Main-Header/MainHeader";
import WelcomeBackPage from "./components/WelcomeBack/WelcomeBack";
import Login from "./components/login/Login";
import AuthContext from "./components/store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <MainHeader />
      <main>
        {!authCtx.isLoggedIn && <Login />}
        {authCtx.isLoggedIn && <WelcomeBackPage />}
      </main>
    </div>
  );
}

export default App;
