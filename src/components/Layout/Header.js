import { Fragment } from "react";

import imageMeals from "../../assets/meals.jpg";
import classes from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={["main-image"]}>
        <img src={imageMeals} alt="A table of food!" />
      </div>
    </Fragment>
  );
};

export default Header;
