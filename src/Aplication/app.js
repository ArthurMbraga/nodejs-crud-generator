import React, { useRef } from "react";
import { ExportBox, FunctionBox, EntityBuilder } from "./Components";
import { Title } from "./styles";
import { Button } from "react-bootstrap";
import Handlebars from "handlebars";
import raw from "raw.macro";
const txt = raw("../FilesGenerators/Models/knex.hbs");

const INITIAL_SETTINGS = {
  files: {},
  methods: { create: true, read: true, update: true, delete: true },
};

function App() {
  const settings = useRef(INITIAL_SETTINGS);
  const entity = useRef();

  function onMethodsChanged(obj) {
    const newSettings = { ...settings.current };
    newSettings.methods = { ...newSettings.methods, ...obj };
    settings.current = newSettings;
  }

  function onFilesChanged(obj) {
    const newSettings = { ...settings.current };
    newSettings.files = { ...newSettings.files, ...obj };
    settings.current = newSettings;
  }

  function onEntityChanged(obj) {
    entity.current = obj;
  }

  function generateFiles() {
    console.log(entity.current);
    console.log(settings.current);

    //const reader = new FileReader();
    // reader.onloadend = () => {
    //    console.log(reader.result);
    //};
    //reader.readAsText(t);
    const template = Handlebars.compile(txt);
    console.log(template({ ...settings.current, ...entity.current }));
  }

  return (
    <div className="p-3">
      <Title>NodeJs CRUD generator</Title>
      <div className="d-flex justify-content-start">
        <div>
          Methods:
          <FunctionBox
            options={["Create", "Read", "Update", "Delete"]}
            onChange={onMethodsChanged}
          />
        </div>
        <div>
          Files to generate:
          <div className="d-flex flex-row flex-wrap">
            <ExportBox
              title="Route"
              options={["Express"]}
              onChange={onFilesChanged}
            />
            <ExportBox
              title="Validator"
              options={["Celebrate"]}
              onChange={onFilesChanged}
            />
            <ExportBox
              title="Model"
              options={["Knex"]}
              onChange={onFilesChanged}
            />
            <ExportBox
              title="Controller"
              options={["Knex + Express"]}
              onChange={onFilesChanged}
            />
            <ExportBox
              title="Migration"
              options={["Knex"]}
              onChange={onFilesChanged}
            />
          </div>
        </div>
      </div>
      Entity Builder:
      <EntityBuilder onChange={onEntityChanged} />
      <Button variant="success" onClick={generateFiles}>
        Generate
      </Button>
    </div>
  );
}

export default App;
