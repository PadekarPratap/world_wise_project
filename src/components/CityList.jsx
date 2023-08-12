import { useCities } from "../context/CitiesContextProvider";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

const CityList = () => {
  const { cities, isLoading, error } = useCities();

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  if (!cities.length)
    return <Message message="Add your favourite cities to the list!" />;

  return (
    <div>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
    </div>
  );
};
export default CityList;
