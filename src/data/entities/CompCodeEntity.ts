export type CompcodeEntity = {
  id: number;
  name: string | null;
  description: string | null;
  unitMhr: number | null;

  //audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};