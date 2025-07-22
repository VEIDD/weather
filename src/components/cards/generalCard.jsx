import styles from "../../css/generalCard.module.css";
export const GeneralCard = ({title, subtitle, srcImg, temp}) => {

  return (
    <div className={styles.general_card}>
      <span>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <h1>
          {temp}{" "}
          <sup>°c</sup>
        </h1>
      </span>
      <img
        src={srcImg}
        alt=""
        width={300}
        height={300}
      />
    </div>
  );
};
