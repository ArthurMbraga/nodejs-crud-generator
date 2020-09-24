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
  ): TextFile | undefined {
    const template = CelebrateValidatorGen.getHbsTemplate();

    if (entity !== undefined) {
      const newEntity: Entity = { ...entity };
      newEntity.Name = FileGenerator.capitalizeFirstLetter(newEntity.name);

      if (entity.fields) {
        newEntity.fields = { ...entity.fields };
        Object.keys(newEntity.fields).forEach((key, index) => {
          const field = newEntity.fields[key];
          field.isNumber = field.type === "float" || field.type === "integer";

          if (field.isPrimaryKey) {
            newEntity.idField = field;
            delete newEntity.fields[key];
          }
        });
      }

      const text = template({ ...settings, entity: newEntity });
      return { [`${newEntity?.Name}Validator.js`]: text };
    }
  }
}

export default CelebrateValidatorGen;
