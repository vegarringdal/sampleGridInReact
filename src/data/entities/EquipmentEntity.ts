export type EquipmentEntity = {
  // todo: add fields we really need, just dummy datasource atm
  ID: string;
  STATUS: string;
  DATE: Date;

  LINE_EQUIPMENT: string;
  TAG_NO: string;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
