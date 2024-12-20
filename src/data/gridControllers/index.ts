import { DummyData } from "../../utils/mockdata/dummyData";
import { GridController } from "../common/GridController";
import { cableGridController } from "./cableGridController";
import { CableEntity } from "../entities/CableEntity";
import { generateDummyGridController } from "../../utils/mockdata/dummyController";
import { equipmentGridController } from "./equipmentGridController";
import { EquipmentEntity } from "../entities/EquipmentEntity";
import { CreateTagoperationsEvent } from "../customEvents/CreateTagoperationsEvent";
import { templateGridController } from "./templateGridController";
import { DuplicateTemplateLineEvent } from "../customEvents/DuplicateTemplateLineEvent";
import { templateLineGridController } from "./templateLineGridController";
import { TemplateEntity } from "../entities/TemplateEntity";
import { TemplateLineEntity } from "../entities/TemplateLineEntity";
import { templateLineCurrentGridController } from "./templateLineCurrentGridController";
import { workpackGridController } from "./workpackGridController";
import { workpackDialogGridController } from "./workpackDialogGridController";
import { WorkpackEntity } from "../entities/WorkpackEntity";
import { PrintWorkpackEvent } from "../customEvents/PrintWorkpackEvent";

///////////////////////////////////////////////////////////////////
// for now we generate some dummy gridControllers
// added many so we can play around with loading dialogs etc/gui
// never use same gridController more than once per page
///////////////////////////////////////////////////////////////////

export const gridControllers: GridControllerTypes = {
  cable: cableGridController,
  equipment: equipmentGridController,

  workpack: workpackGridController,
  workpackDialog: workpackDialogGridController,

  task: generateDummyGridController(),
  taskDialog: generateDummyGridController(),

  opCodes: generateDummyGridController(),
  opCodesDialog: generateDummyGridController(),

  compcodes: generateDummyGridController(),
  compcodesDialog: generateDummyGridController(),

  tagOperations: generateDummyGridController(),

  routingAll: generateDummyGridController(),
  routingSelected: generateDummyGridController(),

  documentsAll: generateDummyGridController(),
  documentsEquip: generateDummyGridController(),
  documentsCable: generateDummyGridController(),

  foreman: generateDummyGridController(),
  foremanDialog: generateDummyGridController(),

  progress: generateDummyGridController(),

  factor: generateDummyGridController(),
  factorDialog: generateDummyGridController(),

  drum: generateDummyGridController(),
  drumSelectCableSort: generateDummyGridController(),

  cableSort: generateDummyGridController(),
  cableSortDialog: generateDummyGridController(),

  cabletypeDim: generateDummyGridController(),
  cabletypeDimDialog: generateDummyGridController(),
  cabletypeType: generateDummyGridController(),
  cabletypeTypeDialog: generateDummyGridController(),

  template: templateGridController,
  templateLinesAll: templateLineGridController,
  templateLineCurrent: templateLineCurrentGridController,

  mcDialog: generateDummyGridController(),
  comDialog: generateDummyGridController(),
  activityDialog: generateDummyGridController(),
  areaDialog: generateDummyGridController(),

  userProjects: generateDummyGridController(),
  userProjectRoles: generateDummyGridController(),
};

/////////////////////////////////////////////////////////////
// need type declaration,
// since we want to ref to sources in gridcontroller config
// we cant have direct ref due to circular depencency
/////////////////////////////////////////////////////////////

export type GridControllerTypes = {
  cable: GridController<CableEntity, CreateTagoperationsEvent>;
  equipment: GridController<EquipmentEntity>;

  workpack: GridController<WorkpackEntity, PrintWorkpackEvent>;
  workpackDialog: GridController<WorkpackEntity, PrintWorkpackEvent>;

  task: GridController<DummyData>;
  taskDialog: GridController<DummyData>;

  opCodes: GridController<DummyData>;
  opCodesDialog: GridController<DummyData>;

  compcodes: GridController<DummyData>;
  compcodesDialog: GridController<DummyData>;

  tagOperations: GridController<DummyData>;

  routingAll: GridController<DummyData>;
  routingSelected: GridController<DummyData>;

  documentsAll: GridController<DummyData>;
  documentsEquip: GridController<DummyData>;
  documentsCable: GridController<DummyData>;

  foreman: GridController<DummyData>;
  foremanDialog: GridController<DummyData>; // for selecting under workpack

  progress: GridController<DummyData>;

  factor: GridController<DummyData>;
  factorDialog: GridController<DummyData>;

  drum: GridController<DummyData>;
  drumSelectCableSort: GridController<DummyData>;

  cableSort: GridController<DummyData>;
  cableSortDialog: GridController<DummyData>; // for selecting under cables & drum

  cabletypeDim: GridController<DummyData>;
  cabletypeDimDialog: GridController<DummyData>; // for selecting under cableSort
  cabletypeType: GridController<DummyData>;
  cabletypeTypeDialog: GridController<DummyData>; // for selecting under cableSort

  template: GridController<TemplateEntity, DuplicateTemplateLineEvent>;
  templateLinesAll: GridController<
    TemplateLineEntity,
    CreateTagoperationsEvent
  >;
  templateLineCurrent: GridController<
    TemplateLineEntity,
    CreateTagoperationsEvent
  >;

  // dialogs task
  mcDialog: GridController<DummyData>;
  comDialog: GridController<DummyData>;
  activityDialog: GridController<DummyData>;
  areaDialog: GridController<DummyData>;

  // all projects user have access to
  userProjects: GridController<DummyData>;
  // all roles user have for each project, each project a user can have different role
  userProjectRoles: GridController<DummyData>;
};
