import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { ExportBox, FunctionBox, EntityBuilder, FileShow } from "./Components";
import { Title } from "./styles";
import { Files, Methods, EntityHolder, Settings } from "./types";
import { knexModelGen } from "../FilesGenerators/Models";
import { knexMigrationGen } from "../FilesGenerators/Migrations";
import { ExpressknexControllerGen } from "../FilesGenerators/Controllers";
import { ExpressRoutesGen } from "../FilesGenerators/Routes";
import { JoiValidatorGen } from "../FilesGenerators/Validators";

const INITIAL_SETTINGS = {
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

  function onEntityChanged(obj: EntityHolder) {
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
    const t = knexModelGen.compileFile(
      entity.current?.entity,
      settings.current
    );
    const a = knexMigrationGen.compileFile(
      entity.current?.entity,
      settings.current
    );
    const b = ExpressknexControllerGen.compileFile(
      entity.current?.entity,
      settings.current
    );
    const c = ExpressRoutesGen.compileFile(
      entity.current?.entity,
      settings.current
    );
    const d = JoiValidatorGen.compileFile(
      entity.current?.entity,
      settings.current
    );
    const files = { "model.js": t, "migration.js": a };
    setTextFiles(files);
    console.log(t, "\n", a, "\n", b, "\n", c, "\n", d);

    // const downloadTxtFile = (text: string, name: string) => {
    //   const element = document.createElement("a");
    //   const file = new Blob([text], { type: "text/plain" });
    //   element.href = URL.createObjectURL(file);
    //   element.download = `${name}.js`;
    //   document.body.appendChild(element); // Required for this to work in FireFox
    //   element.click();
    // };

    //  downloadTxtFile(t, "teste");
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
