import { useState } from "react";

const useGeoLocation = () => {
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getPosition = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentPos = pos.coords;

        setPosition({
          lat: currentPos.latitude,
          lng: currentPos.longitude,
        });
      },
      (err) => {
        console.log(err);
        setError(err.message);
      }
    );

    setIsLoading(false);
  };

  return { isLoading, error, getPosition, position };
};

export { useGeoLocation };
