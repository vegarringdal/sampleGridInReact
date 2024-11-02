export type CableEntity = {
  id: number;
  tag: string;
  fromTag: string;
  areaFrom: string;
  toTag: string;
  areaTo: string;
  site: string;
  const: string;
  design: string;
  cableId: string;
  cableDesc: string;
  cableType: string;
  cableTypeDim: string;
  dicipline: string;
  source: string;
  status: string;
  partAddressFrom: string;
  partAddressTo: string;
  termFrom: string;
  termTo: string;
  mc: string;
  com: string;
  op01: string | null;
  op02: string | null;
  op03: string | null;
  op04: string | null;
  op05: string | null;
  op06: string | null;
  op07: string | null;
  op08: string | null;
  op09: string | null;
  op10: string | null;
  op11: string | null;
  op12: string | null;
  op13: string | null;
  op14: string | null;
  extString01: string | null;
  extString02: string | null;
  extString03: string | null;
  extString04: string | null;
  extString05: string | null;
  extString06: string | null;
  extString07: string | null;
  extString08: string | null;
  extString09: string | null;
  extString10: string | null;
  comment: string | null;

  // audit
  createdBy: string | null;
  modifiedBy: string | null;
  created: Date | null;
  modified: Date | null;

  // for smartUpdate, so we can cache
  isDeleted: boolean | null;
  lastModified: Date | null;
};
