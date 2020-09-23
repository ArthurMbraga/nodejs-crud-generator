import React, { useState, useEffect } from "react";
import Switch from "../../../Components/Switch/switch";
import PropTypes from "prop-types";
import { ShadowBox, Select } from "../../../Components";

function ExportBox(props) {
  const [state, setState] = useState({ enabled: true, type: props.options[0] });

  useEffect(() => {
    handleChange(true);
  }, []);

  function handleChange(newValue) {
    const newState = { ...state, ...newValue };
    setState(newState);

    if (props.onChange) {
      const obj = {};
      obj[props.title.toLowerCase()] = newState;

      props.onChange(obj);
    }
  }

  return (
    <ShadowBox>
      <div className="d-flex flex-row align-items-center">
        <div>
          <Switch
            onChange={(e) => handleChange({ enabled: e })}
            checked={state.enabled}
          />
        </div>
        <p className="ml-1 mb-2">{props.title}</p>
      </div>
      <Select
        disabled={!state.enabled}
        options={props.options}
        onChange={(e) => handleChange({ type: e.target.value })}
      />
    </ShadowBox>
  );
}

ExportBox.propsTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default ExportBox;
