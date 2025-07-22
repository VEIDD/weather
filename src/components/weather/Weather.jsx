import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../Header";
import { ThemeLoader } from "../changeTheme";
import { GeneralCard } from "../cards/generalCard";
import { ForecastHour } from "../cards/forecastHour";
import { ForecastWeek } from "../cards/forecastWeek";
import styles from "../../css/main.module.css";

export const Weather = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [isLoader, setIsLoader] = useState(false)
  const settings = JSON.parse(localStorage.getItem('settings'))
  const translate = async (name) => {
    setIsLoader(true)
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${name}&langpair=en|uk`
    );
    const translate = await res.json();
    setTitle(city);
    setIsLoader(false)
  };

  useEffect(() => {
    if (!lat || !lon) return;
    
    const url = `https://api.weatherapi.com/v1/forecast.json?key=dc2641dce6c240ceaa6161952251807&q=${+lat} ${+lon}&days=14&aqi=yes&alerts=yes`;

    const fetchWeather = async (url) => {
      setIsLoader(true)
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setData(data);
      translate(data.location.name);
      setIsLoader(false)
    };
    fetchWeather(url);
  }, [lat, lon, city]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  return (
    <div>
      <ThemeLoader></ThemeLoader>
      <Header
        onChangeTheme={() => {
          setTheme(theme === "light" ? "dark" : "light");
          localStorage.setItem("theme", theme === "light" ? "dark" : "light");
        }}
      ></Header>
      <main className={styles.main}>
        <div className={styles.container}>
          <div>
            {Object.keys(data).length !== 0 && (
              <GeneralCard
                title={`${title}`}
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
      </main>
      {isLoader && (
        <div className={styles.center_loader}>
          <span className={styles.loader}></span>
        </div>
      )}
    </div>
  );
};
