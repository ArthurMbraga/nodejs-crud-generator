import { Entity, Settings } from "../../../Application/types";
import { fileGenerator } from "../../types";

class knexModelGenerator extends fileGenerator {
  compileFile(entity: Entity, settings: Settings): string {
    const template = knexModelGenerator.getHbsTemplate();

    return template({ ...settings, ...entity });
  }
}

export default knexModelGenerator;
