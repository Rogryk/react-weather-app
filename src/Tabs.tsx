import React, { useEffect } from "react";

interface ITabs {
  setIsBasicDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tabs: React.FC<ITabs> = ({ setIsBasicDisplay }) => {
  return (
    <div className="tabs">
      <button
        type="submit"
        className="btn-style-reset tabs__item text-white text-medium"
        onClick={() => setIsBasicDisplay(true)}
      >
        basic
      </button>
      <button
        type="submit"
        className="btn-style-reset tabs__item text-white text-medium"
        onClick={() => setIsBasicDisplay(false)}
      >
        advanced
      </button>
    </div>
  );
};

export default Tabs;
