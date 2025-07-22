import { useState } from "react";
import styles from "../../css/forecastWeek.module.css";
import { useNavigate } from "react-router-dom";
export const ForecastWeek = ({ data, title }) => {
  let navigate = useNavigate();
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || {
      temp: { value: "temp_c", label: "Цельсій, C°" },
      wind: { value: "m/s", label: "м/с" },
      pressure: { value: "1", label: "мм.рт.ст" },
    }
  );
  const toWeatherDay = (date) => {
    navigate(
      `/weather-day?city=${title}&date=${date}&lat=${data.location.lat}&lon=${data.location.lon}`
    );
  };
  return (
    <div className={styles.forecast_days}>
      <div className={styles.list_days}>
        {data.forecast.forecastday.map((day, index) => {
          const date = new Date(day.date_epoch * 1000);
          const daysOfWeek = {
            0: "Неділя",
            1: "Понеділок",
            2: "Вівторок",
            3: "Середа",
            4: "Четвер",
            5: "П’ятниця",
            6: "Субота",
          };
          const months = [
            "січня",
            "лютого",
            "березня",
            "квітня",
            "травня",
            "червня",
            "липня",
            "серпня",
            "вересня",
            "жовтня",
            "листопада",
            "грудня",
          ];
          const dayName = daysOfWeek[date.getDay()];
          const dayNumber = date.getDate();
          const monthName = months[date.getMonth()];

          const formatted = `${dayName} ${dayNumber} ${monthName}`;

          if (index < 7) {
            return (
              <div className={styles.dayForecast} key={index}>
                <span
                  onClick={() => {
                    toWeatherDay(day.date);
                  }}
                  className={styles.toWeatherDay}
                >
                  {formatted}
                </span>
                <span style={{ float: "right" }}>
                  {settings.temp.value === "temp_c"
                    ? day.day.maxtemp_c.toFixed(0)
                    : day.day.maxtemp_f.toFixed(0)}
                  <sup>°c</sup>
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
