import IconCart from "../Cart/IconCart";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  return (
    <button className={styles.button}>
      <span className={styles.icon}>
        <IconCart />
      </span>
      <span>YourCart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
