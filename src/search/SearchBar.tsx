import React, { useState, useEffect, useRef, FormEvent } from "react";
import { IApi, ILocation, ISearchBar } from "../utils/types";
import Options from "./Options";
import "./style.css";

const SearchBar: React.FC<ISearchBar> = ({
  setCity,
  setLocation,
  setBackgroundImage,
  setIsLoaded,
  isLoaded,
  changeBackgroundImage,
  setChangeBackgroundImage,
  setUnits,
}) => {
  const [optionsIsOpen, setOptionsIsOpen] = useState<boolean>(false);

  const refFormInput = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    let searchBox: any;
    if (refFormInput.current) {
      searchBox = new google.maps.places.SearchBox(refFormInput.current);
      refFormInput.current.focus();
      searchBox.addListener("places_changed", () => {
        setIsLoaded(false);
        if (refFormInput.current != null) {
          const places: any = searchBox.getPlaces()[0];
          const newLat: string = places.geometry.location.lat().toString();
          const newLon: string = places.geometry.location.lng().toString();
          setLocation({
            lon: newLon,
            lat: newLat,
          });
          setCity(places.name);
          setBackgroundImage(places.photos[0].getUrl());
          refFormInput.current.value = "";
        }
      });
    }
  }, []);

  return (
    <>
      <div className="top-bar-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-bar__input"
            ref={refFormInput}
            placeholder="find city"
          />
        </form>
        <button
          className="no-border toggle-options gear-btn filter-white"
          onClick={() => setOptionsIsOpen(!optionsIsOpen)}
        />
        <Options
          optionsIsOpen={optionsIsOpen}
          changeBackgroundImage={changeBackgroundImage}
          setChangeBackgroundImage={setChangeBackgroundImage}
          setUnits={setUnits}
        />
      </div>
    </>
  );
};

export default SearchBar;
