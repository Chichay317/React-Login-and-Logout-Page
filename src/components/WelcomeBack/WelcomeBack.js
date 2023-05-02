import { useContext } from "react";
import Card from "../UI/Card";
import classes from "./WelcomeBack.module.css";
import AuthContext from "../store/auth-context";

const WelcomeBackPage = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes["welcome-box"]}>
      <h2>Welcome Back!</h2>
      <div className={classes["welcome-box-list"]}>
        <a href="/" onClick={authCtx.onLogout}>
          Logout
        </a>
      </div>
    </Card>
  );
};

export default WelcomeBackPage;
