import styles from "./Button.module.css";

const Button = ({ children, onClick, type, disable = false }) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={`${styles.btn} ${styles[type]} `}
    >
      {children}
    </button>
  );
};
export default Button;
