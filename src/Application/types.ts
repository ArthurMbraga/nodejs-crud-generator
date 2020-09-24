export interface Settings {
  files: { [key: string]: File };
  methods: Methods;
}

export interface File {
  enabled: boolean;
  type: string;
}

export interface Files {
  controller: File;
  migration: File;
  model: File;
  validator: File;
}

export interface Methods {
  [key: string]: boolean;
}

export interface Entity {
  name: string;
  tablename: string;
  fields: { [key: string]: Field };
  [key: string]: any;
}

export interface EntityHolder {
  entity: Entity;
}

export interface Field {
  id: number;
  name: string;
  type: string;
  required: boolean;
  default: string;
  isPrimaryKey: boolean;
  [key: string]: any;
}

export interface TextFile {
  [key: string]: string;
}