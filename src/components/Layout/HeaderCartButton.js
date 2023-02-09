import { useContext, useEffect, useState } from "react";

import IconCart from "../Cart/IconCart";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    console.log("useEffect");
    return () => {
      clearTimeout(timer);
      console.log("return");
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <IconCart />
      </span>
      <span>YourCart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
