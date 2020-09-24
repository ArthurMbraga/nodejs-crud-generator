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
  ): TextFile {
    const template = KnexModelGenerator.getHbsTemplate();

    if (entity !== undefined)
      entity.Name = FileGenerator.capitalizeFirstLetter(entity.name);

    const text = template({ ...settings, entity });
    return { [`${entity?.Name}Model.js`]: text };
  }
}

export default KnexModelGenerator;
