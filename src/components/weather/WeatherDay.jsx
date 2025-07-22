import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GeneralCard } from "../cards/generalCard";
import { ForecastHour } from "../cards/forecastHour";
import { ForecastWeek } from "../cards/forecastWeek";
import { Header } from "../Header";
import { ThemeLoader } from "../changeTheme";
import styles from "../../css/main.module.css";

export const WeatherDay = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const date = searchParams.get("date");
  const city = searchParams.get("city");
  const [day, setDay] = useState({});
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const settings = JSON.parse(localStorage.getItem("settings"));
  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      const filtered = data.forecast.forecastday.filter((v) => {
        return v.date === date;
      });
      setDay(filtered);
    }
  }, [date]);

  useEffect(() => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=dc2641dce6c240ceaa6161952251807&q=${lat} ${lon}&days=14&aqi=yes&alerts=yes`;

    const fetchWeather = async (url) => {
      setIsLoader(true);
      const response = await fetch(url);
      const data = await response.json();
      setTitle(`${city}`);
      setData(data);
      const filtered = data.forecast.forecastday.filter((v) => {
        return v.date === date;
      });
      setDay(filtered);
      setIsLoader(false);
    };
    fetchWeather(url);
  }, []);

  const daysOfWeek = {0: "Неділя",1: "Понеділок",2: "Вівторок",3: "Середа",4: "Четвер",5: "П’ятниця",6: "Субота",
  };

  const months = ["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня",
  ];

  useEffect(() => {
    if(day[0] !== undefined){
      let date = new Date(day[0].date_epoch * 1000);
      const dayName = daysOfWeek[date.getDay()];
      const dayNumber = date.getDate();
      const monthName = months[date.getMonth()];
      const formatted = `${dayName} ${dayNumber} ${monthName}`;
      setSubtitle(formatted);
    }
  }, [day]);

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
                subtitle={`(${subtitle})`}
                srcImg={day[0].day.condition.icon}
                temp={
                  settings.temp.value === "temp_c"
                    ? day[0].day.maxtemp_c.toFixed(0)
                    : day[0].day.maxtemp_f.toFixed(0)
                }
              />
            )}

            {Object.keys(data).length !== 0 && (
              <ForecastHour hour={day[0].hour} />
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
