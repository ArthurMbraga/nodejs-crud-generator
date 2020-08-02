import React, { useState } from "react";
import { StyledSwitchContainer } from "./styles";
import _uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";

function Switch(props) {
  const [id] = useState(_uniqueId("switch-"));
  const [checked, setChecked] = useState(props.checked);

  function handleChange(event) {
    const newChecked = !checked;
    setChecked(newChecked);
    if (props.onChange) props.onChange(newChecked);
  }

  return (
    <StyledSwitchContainer>
      <input
        type="checkbox"
        className="onoffswitch-checkbox"
        id={id}
        value={"checked"}
        checked={checked}
        onChange={handleChange}
      />
      <label className="onoffswitch-label" htmlFor={id}></label>
    </StyledSwitchContainer>
  );
}

Switch.propsTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Switch;
