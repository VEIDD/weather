import { useEffect, useState } from "react";
import { GeneralCard } from "./cards/generalCard";
import { ForecastHour } from "./cards/forecastHour";
import { ForecastWeek } from "./cards/forecastWeek";
import styles from "../css/main.module.css";
export const Main = () => {
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || {
      temp: { value: "temp_c", label: "Цельсій, C°" },
      wind: { value: "m/s", label: "м/с" },
      pressure: { value: "1", label: "мм.рт.ст" },
    }
  );

  const translate = async (name) => {
    setIsLoader(true);
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${name}&langpair=en|uk`
    );
    const translate = await res.json();

    setTitle(translate.matches[0].translation.split(',')[0]);
    setIsLoader(false);
  };

  useEffect(() => {
    let url =
      "https://api.weatherapi.com/v1/forecast.json?key=dc2641dce6c240ceaa6161952251807&q=Kyiv&days=14&aqi=yes&alerts=yes";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        url = `https://api.weatherapi.com/v1/forecast.json?key=dc2641dce6c240ceaa6161952251807&q=${position.coords.latitude} ${position.coords.longitude}&days=14&aqi=yes&alerts=yes`;
        fetchWeather(url);
      },
      (error) => {
        console.error("Помилка отримання геолокації:", error.message);
      }
    );

    const fetchWeather = async (url) => {
      setIsLoader(true);
      const response = await fetch(url);
      const data = await response.json();
      translate(data.location.name);
      setData(data);
      setIsLoader(false);
    };
    fetchWeather(url);
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div>
          {Object.keys(data).length !== 0 && (
            <GeneralCard
              title={title}
              srcImg={data.current.condition.icon}
              temp={settings.temp.value === 'temp_c' ? data.current.temp_c.toFixed(0) : data.current.temp_f.toFixed(0)}
            />
          )}
          {Object.keys(data).length !== 0 && (
            <ForecastHour hour={data.forecast.forecastday[0].hour} />
          )}
        </div>

        {Object.keys(data).length !== 0 && (
          <ForecastWeek data={data} title={title} />
        )}
      </div>
      {isLoader && (
        <div className={styles.center_loader}>
          <span className={styles.loader}></span>
        </div>
      )}
    </main>
  );
};
