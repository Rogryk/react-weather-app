import React, { useEffect } from "react";

interface ITabs {
  isBasicDisplay: boolean;
  setIsBasicDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tabs: React.FC<ITabs> = ({ setIsBasicDisplay, isBasicDisplay }) => {
  return (
    <div className="tabs">
      <button
        type="submit"
        className={`btn-style-reset tabs__item text-white text-medium ${
          isBasicDisplay && "tabs__item_underscored"
        }`}
        onClick={() => setIsBasicDisplay(true)}
      >
        basic
      </button>
      <button
        type="submit"
        className={`btn-style-reset tabs__item text-white text-medium ${
          !isBasicDisplay && "tabs__item_underscored"
        }`}
        onClick={() => setIsBasicDisplay(false)}
      >
        advanced
      </button>
    </div>
  );
};

export default Tabs;
