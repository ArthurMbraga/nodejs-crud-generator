import React, { useState } from "react";
import Switch from "../../../Components/Switch/switch";
import PropTypes from "prop-types";
import { ShadowBox } from "../../../Components";

function ExportBox(props) {
  const [enabled] = useState(true);

  function handleChange(newValue, index) {
    const obj = {};
    obj[props.options[index].toLowerCase()] = newValue;
    if (props.onChange) props.onChange(obj);
  }

  return (
    <ShadowBox>
      {props.options?.map((option, index) => {
        return (
          <div key={option} className="d-flex flex-row align-items-center">
            <div>
              <Switch
                onChange={(e) => handleChange(e, index)}
                checked={enabled}
              />
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
  onChange: PropTypes.func,
  onMount: PropTypes.func,
};

export default ExportBox;
