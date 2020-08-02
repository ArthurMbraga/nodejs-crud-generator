import React from "react";
import { Form } from "react-bootstrap";

function Select(props) {
  return (
    <Form.Control as="select" {...props}>
      {props.options?.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </Form.Control>
  );
}

export default Select;
