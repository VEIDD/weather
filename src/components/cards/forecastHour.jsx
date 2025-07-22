import styles from "../../css/forecastHour.module.css";
export const ForecastHour = ({ hour }) => {
  const settings = JSON.parse(localStorage.getItem("settings")) || {
    temp: { value: "temp_c", label: "Цельсій, C°" },
    wind: { value: "m/s", label: "м/с" },
    pressure: { value: "1", label: "мм.рт.ст" },
  };
  return (
    <div className={styles.forecast_hours}>
      {hour.map((hour, index) => {
        if (index === 0 || index % 3 === 0) {
          return (
            <div className={styles.card_hour} key={index}>
              <p>{hour.time.split(" ")[1]}</p>
              <img
                src={hour.condition.icon}
                alt="img"
                width={100}
                height={100}
              />
              <p className={styles.tempHour}>
                {settings.temp.value === "temp_c"
                  ? hour.temp_c.toFixed(0)
                  : hour.temp_f.toFixed(0)}
                <sup>°c</sup>
              </p>
              <p className={styles.windHour}>
                {settings.wind.value === "m/s"
                  ? `${Math.round((hour.wind_kph * 1000) / 3600)}`
                  : settings.wind.value === "kp/h"
                  ? `${hour.wind_kph}`
                  : `${hour.wind_mph}`}
                <br />
                {settings.wind.value === "m/s"
                  ? "м/с"
                  : settings.wind.value === "kp/h"
                  ? "км/год"
                  : "миль/год"}
              </p>
              <p className={styles.pressureHour}>
                {settings.pressure.value === "1"
                  ? `${hour.pressure_mb} мм.рт.ст`
                  : `${hour.pressure_in} дм.рт.ст`}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};
