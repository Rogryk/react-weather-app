import React, { useState } from "react";
import { Switch } from "@mantine/core";
import { SegmentedControl } from "@mantine/core";

export interface IOptions {
  optionsIsOpen: boolean;
  changeBackgroundImage: boolean;
  setChangeBackgroundImage: React.Dispatch<React.SetStateAction<boolean>>;
  setUnits: React.Dispatch<React.SetStateAction<string>>;
}

const Options: React.FC<IOptions> = ({
  optionsIsOpen,
  changeBackgroundImage,
  setChangeBackgroundImage,
  setUnits,
}) => {
  return (
    <>
      <div
        className={`options-container ${optionsIsOpen ? "" : "collapse-width"}`}
      >
        <Switch
          checked={changeBackgroundImage}
          onChange={(event) =>
            setChangeBackgroundImage(event.currentTarget.checked)
          }
          classNames={{
            root: "background-switch__root center-ver column-display",
            label: "background-switch__label text-white",
          }}
          size="md"
          label=" dynamic background"
          color="indigo"
          onLabel="ON"
          offLabel="OFF"
        />
        <SegmentedControl
          onChange={(event) => setUnits(event)}
          className="unit-segmented-control center-hor"
          classNames={{
            label: "segmented-control-label",
          }}
          color="dark"
          data={[
            { label: "Metric", value: "metric" },
            { label: "Imperial", value: "imperial" },
          ]}
        />
      </div>
    </>
  );
};

export default Options;
