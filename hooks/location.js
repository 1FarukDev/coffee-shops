import React, { useState } from "react";

function useTrackLocation() {
  const [ll, setLl] = useState("");
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLl(`${latitude},${longitude}`);
    setLocationErrorMsg("");
    setIsFindingLocation(false)
  };
  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMsg("Unable to retrieve your location");
  };
  
  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {
    ll,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
}

export default useTrackLocation;
