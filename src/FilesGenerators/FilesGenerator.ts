import { ExpressknexControllerGen } from "./Controllers";
import { knexModelGen } from "./Models";
import { ExpressRoutesGen } from "./Routes";
import { CelebrateValidatorGen } from "./Validators";

import { Entity, Settings, TextFile, File } from "../Application/types";
import { FileGenerator } from "./types";
import KnexMigrationGen from "./Migrations/knex/knex";

export class FilesGenerator {
  static generateFiles(entity: Entity, settings: Settings): TextFile {
    let response = {};

    const files = Object.keys(settings.files);

    files.forEach((fileType) => {
      const file = settings.files[fileType];
      const enabled = file.enabled;

      let FileGen;

      if (enabled) {
        switch (fileType) {
          case "controller":
            FileGen = FilesGenerator.selectController(file);
            break;

          case "migration":
            FileGen = FilesGenerator.selectMigration(file);
            break;

          case "model":
            FileGen = FilesGenerator.selectModel(file);
            break;

          case "route":
            FileGen = FilesGenerator.selectRoute(file);
            break;

          case "validator":
            FileGen = FilesGenerator.selectValidator(file);
            break;
        }
      }

      if (FileGen) {
        const newFile = FileGen.compileFile(entity, settings)
        response = {...response, ...newFile };
      }
    });

    return response;
  }

  static selectController(file: File): FileGenerator | undefined {
    switch (file.type) {
      case "Knex + Express":
        return new ExpressknexControllerGen();
    }
  }

  static selectMigration(file: File): FileGenerator | undefined {
    switch (file.type) {
      case "Knex":
        return new KnexMigrationGen();
    }
  }

  static selectModel(file: File): FileGenerator | undefined {
    switch (file.type) {
      case "Knex":
        return new knexModelGen();
    }
  }

  static selectRoute(file: File): FileGenerator | undefined {
    switch (file.type) {
      case "Express":
        return new ExpressRoutesGen();
    }
  }

  static selectValidator(file: File): FileGenerator | undefined {
    switch (file.type) {
      case "Celebrate":
        return new CelebrateValidatorGen();
    }
  }
}
