import React, { useState } from "react";
import Switch from "../../../Components/Switch/switch";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { ShadowBox, Select } from "../../../Components";

function ExportBox(props) {
  const [enabled, setEnabled] = useState(true);

  function handleChange(newValue) {
    setEnabled(newValue);
  }

  return (
    <ShadowBox>
      <div className="d-flex flex-row align-items-center">
        <div>
          <Switch onChange={handleChange} checked={enabled} />
        </div>
        <p className="ml-1 mb-2">{props.title}</p>
      </div>
      <Select disabled={!enabled} options={props.options} />
    </ShadowBox>
  );
}

ExportBox.propsTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
};

export default ExportBox;
