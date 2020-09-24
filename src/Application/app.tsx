import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { ExportBox, FunctionBox, EntityBuilder, FileShow } from "./Components";
import { Title } from "./styles";
import { Files, Methods, EntityHolder, Settings } from "./types";
import { FilesGenerator } from "../FilesGenerators";

const INITIAL_SETTINGS: Settings = {
  files: {},
  methods: { create: true, read: true, update: true, delete: true },
};

interface TextFile {
  [key: string]: string;
}

const App: React.FC = () => {
  const settings = useRef<Settings>(INITIAL_SETTINGS);
  const entity = useRef<EntityHolder>();
  const [textFiles, setTextFiles] = useState<TextFile>({});

  function onMethodsChanged(obj: Methods) {
    const newSettings = { ...settings.current };
    newSettings.methods = { ...newSettings.methods, ...obj };
    settings.current = newSettings;
  }

  function onFilesChanged(obj: Files) {
    const newSettings = { ...settings.current };
    newSettings.files = { ...newSettings.files, ...obj };
    settings.current = newSettings;
  }

  function onEntityChanged(obj: EntityHolder): void {
    entity.current = obj;
  }

  function generateFiles() {
    console.log(entity.current);
    console.log(settings.current);

    let files = {};
    if (entity.current)
      files = FilesGenerator.generateFiles(
        entity.current.entity,
        settings.current
      );
    setTextFiles(files);
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
      <FileShow files={textFiles} />
    </div>
  );
};

export default App;
