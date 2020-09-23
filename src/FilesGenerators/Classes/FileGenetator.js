import raw from "raw.macro";
class FileGenerator {
  constructor(text) {
    this._text = text;
  }

  /**
   * Implementation optional
   */
  genericMethod() {
    console.log("running from super class. Text: " + this._text);
  }

  /**
   * Implementation required
   */
  static generateFileText(entity) {
    const txt = raw("../FilesGenerators/Models/knex.hbs");
    const template = Handlebars.compile(txt);
    console.log(template({ ...settings.current, ...entity.current }));
    
    throw new Error("You have to implement the method generateFileText!");
  }
}

export default FileGenerator;
