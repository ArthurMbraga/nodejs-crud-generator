import raw from "raw.macro";
import Handlebars from "handlebars";
import { Entity, Settings, TextFile } from "../../../Application/types";
import { FileGenerator } from "../../types";

class CelebrateValidatorGen extends FileGenerator {
  protected static getHbsTemplate(): HandlebarsTemplateDelegate<any> {
    const txt = raw("./template.hbs");
    const template = Handlebars.compile(txt);
    return template;
  }

  public compileFile(
    entity: Entity | undefined,
    settings: Settings | undefined
  ): TextFile {
    const template = CelebrateValidatorGen.getHbsTemplate();

    if (entity !== undefined)
      entity.Name = FileGenerator.capitalizeFirstLetter(entity.name);

    if (entity && entity.fields)
      Object.keys(entity.fields).forEach((key, index) => {
        const field = entity.fields[key];
        field.isNumber = field.type === "float" || field.type === "integer";

        if (field.isPrimaryKey) {
          entity.idField = field;
          delete entity.fields[key];
        }
      });

    const text = template({ ...settings, entity });
    return { [`${entity?.Name}Validator.js`]: text };
  }
}

export default CelebrateValidatorGen;
