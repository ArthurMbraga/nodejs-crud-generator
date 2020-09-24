import raw from "raw.macro";
import Handlebars from "handlebars";
import { Entity, Settings, TextFile } from "../../../Application/types";
import { FileGenerator } from "../../types";
class KnexModelGenerator extends FileGenerator {
  protected static getHbsTemplate(): HandlebarsTemplateDelegate<any> {
    const txt = raw("./template.hbs");
    const template = Handlebars.compile(txt);
    return template;
  }

  public compileFile(
    entity: Entity | undefined,
    settings: Settings | undefined
  ): TextFile | undefined {
    const template = KnexModelGenerator.getHbsTemplate();

    if (entity !== undefined) {
      const newEntity: Entity = { ...entity };
      newEntity.Name = FileGenerator.capitalizeFirstLetter(newEntity.name);

      const text = template({ ...settings, entity: newEntity });
      return { [`${newEntity?.Name}Model.js`]: text };
    }
  }
}

export default KnexModelGenerator;
