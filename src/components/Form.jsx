// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import countryCodeEmoji from "country-code-emoji";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useCities } from "../context/CitiesContextProvider";

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoLocationError, setGeoLocationError] = useState("");
  const [geoLocationLoading, setGeoLocationLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationOfCity = async () => {
      try {
        setGeoLocationLoading(true);
        setGeoLocationError("");
        const { data } = await axios.get(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error("No city found. Please click somewhere else!");

        // console.log(data);
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (err) {
        console.log(err.message);
        setGeoLocationError(err.message);
      } finally {
        setGeoLocationLoading(false);
      }
    };

    if (lat && lng) {
      fetchLocationOfCity();
    }
  }, [lat, lng]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName || !country || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
      id: crypto.randomUUID(),
    };

    createCity(newCity);
    navigate("/app/cities");
  };

  return (
    <>
      {geoLocationLoading ? (
        <Spinner />
      ) : geoLocationError ? (
        <Message message={geoLocationError} />
      ) : (
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
            />
            {emoji && (
              <span className={styles.flag}>{countryCodeEmoji(emoji)}</span>
            )}
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            {/* <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            /> */}

            <DatePicker
              id="date"
              onChange={(date) => setDate(date)}
              value={date}
              className={styles["date-picker-main"]}
              format="dd-MM-yyyy"
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </div>

          <div className={styles.buttons}>
            <Button disable={isLoading} type="primary">
              Add
            </Button>
            <BackButton />
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
