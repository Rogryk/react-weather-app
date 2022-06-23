import React, { useState, useEffect, useRef } from "react";
import { IApi } from "./store/Interface";

export interface ISearchBar {
  setApiSettings: React.Dispatch<React.SetStateAction<IApi>>;
}

const SearchBar: React.FC<ISearchBar> = ({ setApiSettings }) => {
  const GOOGLE_API_KEY = "AIzaSyDmLCYjIrzQnk4eV_pxb6aY_zyO3vK-9MU";

  const refFormInput = useRef<HTMLInputElement>(null);
  let autocomplete: any = null;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 'type guard'
    if (refFormInput.current != null) {
      // console.log(refFormInput.current.value);
      // console.log(refFormInput.current);
      refFormInput.current.value = "";
    }
  };

  const onPlaceSelected = (place: any) => {
    console.log(place);
  };

  const options = {
    fields: ["place_id", "formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["locality"],
  };

  useEffect(() => {
    if (refFormInput.current != null) {
      refFormInput.current.focus();
    }
    if (refFormInput.current != null) {
      autocomplete = new google.maps.places.Autocomplete(
        refFormInput.current,
        options
      );
      autocomplete.addListener("place_changed", () => {
        const newLat = autocomplete.getPlace().geometry.location.lat();
        const newLon = autocomplete.getPlace().geometry.location.lng();
        setApiSettings({
          link: "https://api.openweathermap.org/data/2.5/onecall?",
          key: "ad44ec1e12a563fb81adb439af6fb615",
          // lon: newLon,
          // lat: newLat,
          unit: "metric", // "imperial"
          lang: "pl",
        });
      });
    }
  }, []);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        ref={refFormInput}
        placeholder="find city"
      />
    </form>
  );
};

export default SearchBar;
