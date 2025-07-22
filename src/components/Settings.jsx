import styles from "../css/settings.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "./select style/style";

const optionsTemp = [
  { value: "temp_c", label: "Цельсій, C°" },
  { value: "temp_f", label: "Фаренгейт, F° " },
];
const optionsWind = [
  { value: "m/s", label: "м/с" },
  { value: "kp/h", label: "км/год" },
  { value: "mp/h", label: "миль/год" },
];
const optionsPressure = [
  { value: "1", label: "мм.рт.ст" },
  { value: "2", label: "дм.рт.ст" },
];

export const Settings = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(isOpen);
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || {
      temp: { value: "temp_c", label: "Цельсій, C°" },
      wind: { value: "m/s", label: "м/с" },
      pressure: { value: "1", label: "мм.рт.ст" },
    }
  );
  const oldSettings = JSON.parse(localStorage.getItem("settings")) || {
      temp: { value: "temp_c", label: "Цельсій, C°" },
      wind: { value: "m/s", label: "м/с" },
      pressure: { value: "1", label: "мм.рт.ст" },
    };

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const [selectedOption, setSelectedOption] = useState(null);
  const saveSettings = () => {
    console.log(oldSettings, settings)
    if (
      oldSettings.temp.value !== settings.temp.value ||
      oldSettings.wind.value !== settings.wind.value ||
      oldSettings.pressure.value !== settings.pressure.value
    ) {
      localStorage.setItem("settings", JSON.stringify(settings));
      location.reload();
    }
    onClose();
  };
  if (!visible) return null;

  return (
    <div
      className={`${styles.settings} ${isOpen ? styles.open : styles.close}`}
    >
      <div className={styles.list}>
        <span className={styles.setting}>
          <p>Температура</p>
          <Select
            styles={customStyles}
            options={optionsTemp}
            defaultValue={settings.temp || optionsTemp[0]}
            onChange={(selected) => {
              setSettings((prev) => {
                return { ...prev, temp: selected };
              });
              setSelectedOption(selected);
            }}
            placeholder="Оберіть варіант"
          />
        </span>
        <span className={styles.setting}>
          <p>Швидкість вітру</p>
          <Select
            styles={customStyles}
            options={optionsWind}
            defaultValue={settings.wind || optionsWind[0]}
            onChange={(selected) => {
              setSettings((prev) => {
                return { ...prev, wind: selected };
              });
              setSelectedOption(selected);
            }}
            placeholder="Оберіть варіант"
          />
        </span>
        <span className={styles.setting}>
          <p>Тиск</p>
          <Select
            styles={customStyles}
            options={optionsPressure}
            defaultValue={settings.pressure || optionsPressure[0]}
            onChange={(selected) => {
              setSettings((prev) => {
                return { ...prev, pressure: selected };
              });
              setSelectedOption(selected);
            }}
            placeholder="Оберіть варіант"
          />
        </span>
      </div>
      <button className={styles.save_btn} onClick={saveSettings}>
        Зберегти налаштування
      </button>
    </div>
  );
};
