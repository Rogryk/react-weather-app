import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";

const SearchBar = () => {
  const GOOGLE_API_KEY = "AIzaSyDmLCYjIrzQnk4eV_pxb6aY_zyO3vK-9MU";

  return (
    <nav className="search-bar">
      <Autocomplete
        // apiKey={GOOGLE_API_KEY}
        className="search-bar__input"
        onPlaceSelected={(place, inputRef, autocomplete) => {
          console.log(autocomplete);
        }}
      />
    </nav>
  );
};

export default SearchBar;
