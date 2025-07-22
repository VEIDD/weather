import { useEffect, useState } from "react";
import styles from "../css/dropdown.module.css";
import { NavLink } from "react-router-dom";
export const Dropdown = ({ isOpen, searchResult, clearInput, onClose }) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  const close = () => {
    clearInput();
    onClose();
  };
  if (!visible) return null;

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.open : styles.close}`}
    >
      <img
        src="public/close_icon.svg"
        alt=""
        width={50}
        height={50}
        className={styles.close_btn}
        onClick={close}
      />
      <h1>Результати пошуку:</h1>
      {searchResult.map((info, index) => {
        return (
          <NavLink
            className={styles.name}
            to={`/weather?city=${info.name}&lat=${info.boundingbox[0]}&lon=${info.boundingbox[2]}`}
            key={index}
          >
            {info.display_name}
          </NavLink>
        );
      })}
    </div>
  );
};
