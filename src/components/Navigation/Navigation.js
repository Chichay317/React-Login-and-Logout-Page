import { Fragment, useContext } from "react";
import classes from "./Navigation.module.css";
import AuthContext from "../store/auth-context";

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <nav>
        <ul className={classes["nav-lists"]}>
          {authCtx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <a
                onClick={authCtx.onLogout}
                className={classes["spec-nav-list"]}
                href="/"
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navigation;
