import { Entity, Settings } from "../../../Application/types";
import { fileGenerator } from "../../types";

class expressRoutesGen extends fileGenerator {
  compileFile(entity: Entity, settings: Settings): string {
    const template = expressRoutesGen.getHbsTemplate();

    return template({ ...settings, ...entity });
  }
}

export default expressRoutesGen;
