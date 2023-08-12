import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import { useCities } from "../context/CitiesContextProvider";

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your favourite cities to the list!" />;

  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) {
      return arr;
    } else {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
  }, []);

  return (
    <div>
      <ul className={styles.countryList}>
        {countries.map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
      </ul>
    </div>
  );
};
export default CityList;
