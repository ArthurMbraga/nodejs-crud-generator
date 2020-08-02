import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { FieldItem } from "../";

const INITIAL_STATE = {
  "-1": {
    id: -1,
    name: "id",
    type: "integer",
    required: false,
    default: undefined,
  },
};

function ExportBox(props) {
  const [fields, setFields] = useState(INITIAL_STATE);

  function addField(field) {
    const newFields = { ...fields };
    newFields[field.id] = field;

    setFields(newFields);
  }

  function handleDelete(id) {
    const newFields = { ...fields };
    delete newFields[id];
    setFields(newFields);
  }

  return (
    <div>
      <div className="d-flex flex-row">
        <div className="mr-2">
          <Form.Control type="text" placeholder="Entity Name" />
          <Form.Text className="text-muted">Ex: product</Form.Text>
        </div>
        <div className="mr-2">
          <Form.Control type="text" placeholder="Table Name" />
          <Form.Text className="text-muted">Ex: products</Form.Text>
        </div>
      </div>
      <FieldItem addMode={true} submitNew={addField} />
      {Object.keys(fields)
        .reverse()
        .map((key) => {
          const field = fields[key];
          return (
            <FieldItem
              key={field.id}
              fieldData={field}
              onDelete={handleDelete}
            />
          );
        })}
    </div>
  );
}

ExportBox.propsTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
};

export default ExportBox;
