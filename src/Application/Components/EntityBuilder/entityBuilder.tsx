import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { FieldItem } from "..";
import { Entity, EntityHolder, Field } from "../../types";

const INITIAL_FIELDS: Fields = {
  0: {
    id: 0,
    name: "id",
    type: "integer",
    required: false,
    default: undefined,
    isPrimaryKey: true,
  },
};

const INITIAL_ENTITY: Entity = {
  name: "",
  tableName: "",
  fields: { ...INITIAL_FIELDS },
};

interface Props {
  onChange?: (obj: EntityHolder) => void;
}

interface Fields {
  [key: string]: Field;
}

const EntityBuilder: React.FC<Props> = (props) => {
  const [fields, setFields] = useState<Fields>(INITIAL_FIELDS);
  const [entity, setEntity] = useState<Entity>(INITIAL_ENTITY);

  function addField(field: Field) {
    const newFields = { ...fields };
    newFields[field.id] = field;

    setFields(newFields);
  }

  function handleDelete(id: number): void {
    const newFields = { ...fields };
    delete newFields[id];
    setFields(newFields);
  }

  function handleUpdateEntity(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { value, name } = event.target;
    const newEntity = { ...entity };
    newEntity[name] = value;
    setEntity(newEntity);
  }

  function handleUpdateField(obj: Field): void {
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
      <FieldItem addMode submitNew={addField} startId={1} />
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
};

export default EntityBuilder;
