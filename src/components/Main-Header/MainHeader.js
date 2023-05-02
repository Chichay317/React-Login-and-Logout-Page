import Navigation from "../Navigation/Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <div className={classes["main-header"]}>
      <h2>React Navbar</h2>
      <Navigation />
    </div>
  );
};

export default MainHeader;
