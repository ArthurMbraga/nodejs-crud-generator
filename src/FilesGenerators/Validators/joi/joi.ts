import raw from "raw.macro";
import Handlebars from "handlebars";
import { Entity, Settings } from "../../../Application/types";
import { FileGenerator } from "../../types";

class JoiValidadorGen extends FileGenerator {
  protected static getHbsTemplate(): HandlebarsTemplateDelegate<any> {
    const txt = raw("./template.hbs");
    const template = Handlebars.compile(txt);
    return template;
  }

  public static compileFile(
    entity: Entity | undefined,
    settings: Settings | undefined
  ): string {
    const template = JoiValidadorGen.getHbsTemplate();

    if (entity && entity.fields)
      Object.keys(entity.fields).forEach((key, index) => {
        const field = entity.fields[key];
        field.isNumber = field.type === "float" || field.type === "integer";

        if (field.isPrimaryKey) {
          entity.idField = field;
          delete entity.fields[key];
        }
      });

    return template({ ...settings, entity });
  }
}

export default JoiValidadorGen;
