import { Entity, Settings, TextFile } from "../Application/types";

export abstract class FileGenerator {
  protected static getHbsTemplate(): HandlebarsTemplateDelegate {
    throw new Error("Not implemented");
  }

  public abstract compileFile(
    entity: Entity | undefined,
    settings: Settings | undefined
  ): TextFile | undefined;

  public static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
