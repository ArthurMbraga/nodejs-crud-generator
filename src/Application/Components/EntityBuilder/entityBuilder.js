import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { FieldItem } from "..";

const INITIAL_FIELDS = {
  "0": {
    id: 0,
    name: "id",
    type: "integer",
    required: false,
    default: undefined,
  },
};

const INITIAL_ENTITY = {
  name: "",
  tableName: "",
};

function EntityBuilder(props) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [entity, setEntity] = useState(INITIAL_ENTITY);

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

  function handleUpdateEntity(event) {
    const { value, name } = event.target;
    const newEntity = { ...entity };
    newEntity[name] = value;
    setEntity(newEntity);
  }

  function handleUpdateField(obj) {
    const newFields = { ...fields };
    newFields[obj.id] = obj;
    setFields(newFields);
  }

  useEffect(() => {
    if (props.onChange) {
      const obj = { entity: { ...entity, fields } };
      props.onChange(obj);
    }
  }, [fields, entity, props]);

  return (
    <div>
      <div className="d-flex flex-row">
        <div className="mr-2">
          <Form.Control
            type="text"
            placeholder="Entity Name"
            value={entity.name}
            name="name"
            onChange={handleUpdateEntity}
          />
          <Form.Text className="text-muted">Ex: product</Form.Text>
        </div>
        <div className="mr-2">
          <Form.Control
            type="text"
            placeholder="Table Name"
            value={entity.tableName}
            name="tableName"
            onChange={handleUpdateEntity}
          />
          <Form.Text className="text-muted">Ex: products</Form.Text>
        </div>
      </div>
      <FieldItem addMode={true} submitNew={addField} startId={1} />
      {Object.keys(fields)
        .reverse()
        .map((key) => {
          const field = fields[key];
          return (
            <FieldItem
              key={field.id}
              fieldData={field}
              onDelete={handleDelete}
              onChange={handleUpdateField}
            />
          );
        })}
    </div>
  );
}

EntityBuilder.propsTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
};

export default EntityBuilder;
