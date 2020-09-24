import { Entity, Settings } from "../Application/types";


export abstract class FileGenerator {
  protected static getHbsTemplate(): HandlebarsTemplateDelegate {
    throw new Error("Not implemented");
  }

  public static compileFile(
    entity: Entity | undefined,
    settings: Settings | undefined
  ): string {
    throw new Error("Not implemented");
  }
}
