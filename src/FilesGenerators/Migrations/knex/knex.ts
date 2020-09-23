import { Entity, Settings } from "../../../Application/types";
import { fileGenerator } from "../../types";

class knexMigrationGen extends fileGenerator {
  compileFile(entity: Entity, settings: Settings): string {
    const template = knexMigrationGen.getHbsTemplate();

    return template({ ...settings, ...entity });
  }
}

export default knexMigrationGen;
