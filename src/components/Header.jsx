import { useCallback, useContext, useEffect, useState } from "react";
import styles from "../css/header.module.css";
import debounce from "debounce";
import { NavLink } from "react-router-dom";
import { Dropdown } from "./dropdown";
import { ThemeContext } from "../contexts/ThemeContext";
import { Settings } from "./Settings";
export const Header = ({ onChangeTheme }) => {
  const theme = localStorage.getItem("theme") || useContext(ThemeContext);
  const base = import.meta.env.BASE_URL;
  const src=`${base}${theme}_icon.svg`

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    if (searchResult.length > 0) {
      setIsDropdownOpen(true);
    } else {
    }
  }, [searchResult]);
  const changeInput = (e) => {
    setSearchValue(e.target.value);
    searchCity(e.target.value);
  };

  const searchCity = useCallback(
    debounce((value) => {
      fetchCities(value);
    }, 500),
    []
  );

  const fetchCities = async (value) => {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${value}&countrycodes=UA&format=json`
    );
    let data = await response.json();
    setSearchResult(data);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className={styles.header}>
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <NavLink to={"/"} className={styles.title}>
        Weather
      </NavLink>
      <div className={styles.btns}>
        <div className={styles.searchBlock}>
          <img
            src={`${base}search_icon.svg`}
            alt=""
            width={25}
            className={styles.search_icon}
          />
          <input
            type="text"
            className={styles.search}
            placeholder="Search city"
            value={searchValue}
            onChange={changeInput}
          />
          <Dropdown
            searchResult={searchResult}
            isOpen={isDropdownOpen}
            clearInput={() => {
              setSearchValue("");
            }}
            onClose={() => setIsDropdownOpen(false)}
          />
        </div>
        <button className={styles.changeTheme}>
          <img src={src} alt="" width={50} onClick={onChangeTheme} />
        </button>
        <button
          className={styles.btn_settings}
          onClick={() => {
            setShowSettings((prev) => !prev);
          }}
        >
          <img src={`${base}settings.svg`} alt="" width={30} />
        </button>
      </div>
    </header>
  );
};
