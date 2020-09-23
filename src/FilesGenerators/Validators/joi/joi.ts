import { Entity, Settings } from "../../../Application/types";
import { fileGenerator } from "../../types";

class joiValidadorGen extends fileGenerator {
  compileFile(entity: Entity, settings: Settings): string {
    const template = joiValidadorGen.getHbsTemplate();

    return template({ ...settings, ...entity });
  }
}

export default joiValidadorGen;
