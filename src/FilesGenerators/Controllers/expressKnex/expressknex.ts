import { Entity, Settings } from "../../../Application/types";
import { fileGenerator } from "../../types";

class expressKnexControllerGen extends fileGenerator {
  compileFile(entity: Entity, settings: Settings): string {
    const template = expressKnexControllerGen.getHbsTemplate();

    return template({ ...settings, ...entity });
  }
}

export default expressKnexControllerGen;
