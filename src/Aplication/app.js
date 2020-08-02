import React from "react";
import { ExportBox, FunctionBox, EntityCreator } from "./Components";
import { Title } from "./styles";

function App() {
  return (
    <div className="p-3">
      <Title>NodeJs CRUD generator</Title>
      <div className="d-flex justify-content-start">
        <div>
          Settings:
          <FunctionBox options={["Create", "Read", "Update", "Delete"]} />
        </div>
        <div>
          Files to generate:
          <div className="d-flex flex-row flex-wrap">
            <ExportBox title="Route" options={["Express"]} />
            <ExportBox title="Validator" options={["Celebrate"]} />
            <ExportBox title="Model" options={["Knex"]} />
            <ExportBox title="Controller" options={["Knex + Express"]} />
            <ExportBox title="Migration" options={["Knex"]} />
          </div>
        </div>
      </div>
      <EntityCreator />
    </div>
  );
}

export default App;
