import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
};

const CitiesContext = createContext();
const BASE_URL = "http://localhost:3500";

const CitiesContextProvider = ({ children }) => {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //   const [cities, setCities] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });
        const { data } = await axios.get(`${BASE_URL}/cities`);
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "rejected",
          payload: "There was an error loading the cities...",
        });
      }
      //   finally {
      //     setIsLoading(false);
      //   } /* taken care by useReducer */
    };

    fetchCities();
  }, []);

  const fetchCity = async (id) => {
    if (id === currentCity.id) return;

    try {
      //   setIsLoading(true);
      dispatch({ type: "loading" });
      const { data } = await axios.get(`http://localhost:3500/cities/${id}`);

      //   setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      console.log(Error);
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    } /*finally {
      setIsLoading(false);
    }*/
  };

  const createCity = async (newCity) => {
    try {
      //   setIsLoading(true);
      dispatch({ type: "loading" });
      await axios.post(`http://localhost:3500/cities`, newCity);
      //   setCities((prev) => [...prev, newCity]);
      dispatch({ type: "city/created", payload: newCity });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
    //  finally {
    //   setIsLoading(false);
    // }
  };

  const deleteCity = async (id) => {
    try {
      //   setIsLoading(true);
      dispatch({ type: "loading" });
      await axios.delete(`http://localhost:3500/cities/${id}`);
      //   setCities((prev) => prev.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
    /*finally {
      setIsLoading(false);
    }*/
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

// in real world try to create a new custom hook in separate file
const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Context is called outside the provider");
  return context;
};

/* eslint-disable */
export { CitiesContextProvider, useCities };
