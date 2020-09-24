import { ExpressknexControllerGen } from "./Controllers";
import { knexMigrationGen } from "./Migrations";
import { knexModelGen } from "./Models";
import { ExpressRoutesGen } from "./Routes";
import { JoiValidatorGen } from "./Validators";

import { Entity, Settings, TextFile } from "../Application/types";

export class FilesGenerator {
  static generateFiles(
    entity: Entity,
    settings: Settings,
    files: TextFile
  ): TextFile {
    const response = {};

    return response;
  }
}
