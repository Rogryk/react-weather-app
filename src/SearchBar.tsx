import React, { useState, useEffect, useRef, FormEvent } from "react";
import { IApi } from "./store/Interface";

export interface ISearchBar {
  setApiSettings: React.Dispatch<React.SetStateAction<IApi>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<ISearchBar> = ({ setApiSettings, setCity }) => {
  const GOOGLE_API_KEY = "AIzaSyDmLCYjIrzQnk4eV_pxb6aY_zyO3vK-9MU";
  const refFormInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const options = {
    fields: ["place_id", "formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["locality"],
  };

  useEffect(() => {
    if (refFormInput.current) {
      const searchBox: any = new google.maps.places.SearchBox(
        refFormInput.current
      );
      refFormInput.current.focus();
      searchBox.addListener("places_changed", () => {
        if (refFormInput.current) {
          const places: any = searchBox.getPlaces()[0];
          console.log(places.photos[0].getUrl());

          const newLat: string = places.geometry.location.lat().toString();
          const newLon: string = places.geometry.location.lng().toString();
          console.log(newLat, newLon);

          setApiSettings({
            link: "https://api.openweathermap.org/data/2.5/onecall?",
            key: "ad44ec1e12a563fb81adb439af6fb615",
            // lon: newLon,
            // lat: newLat,
            unit: "metric", // "imperial"
            lang: "pl",
          });
          refFormInput.current.value = "";
          // setCity('')
        }
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
