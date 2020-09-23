import { Entity, Settings } from "../Application/types";
import raw from "raw.macro";

export abstract class fileGenerator {
  static hbsFilePath: string = "./template.hbs";

  protected static getHbsTemplate(): HandlebarsTemplateDelegate {
    const txt = raw(this.hbsFilePath);
    const template = Handlebars.compile(txt);
    return template;
  }

  abstract compileFile(entity: Entity, settings: Settings): string;
}
