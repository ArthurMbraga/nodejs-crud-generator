import React, { useState } from "react";
import Switch from "../../../Components/Switch/switch";
import PropTypes from "prop-types";
import { ShadowBox } from "../../../Components";

function ExportBox(props) {
  const [enabled, setEnabled] = useState(true);

  function handleChange(newValue) {
    setEnabled(newValue);
  }

  return (
    <ShadowBox>
      {props.options?.map((option) => {
        return (
          <div key={option} className="d-flex flex-row align-items-center">
            <div>
              <Switch onChange={handleChange} checked={enabled} />
            </div>
            <p className="ml-1 mb-2">{option}</p>
          </div>
        );
      })}
    </ShadowBox>
  );
}

ExportBox.propsTypes = {
  options: PropTypes.array,
};

export default ExportBox;
