import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContextProvider";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities();

  const { position } = city;

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCity(city.id);
  };

  return (
    <li>
      <Link
        to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === city.id ? styles["cityItem--active"] : ""
        } `}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
};
export default CityItem;
