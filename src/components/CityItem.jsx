import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const CityItem = ({ city }) => {
  console.log(city);

  const { position } = city;

  return (
    <li>
      <Link
        to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};
export default CityItem;
