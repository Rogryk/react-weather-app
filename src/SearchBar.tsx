import React, { useState, useEffect, useRef } from "react";

const SearchBar = () => {
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
    console.log("plejs");

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
        console.log(autocomplete.getPlace().geometry.location.lat());
        console.log(autocomplete.getPlace().geometry.location.lng());
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
