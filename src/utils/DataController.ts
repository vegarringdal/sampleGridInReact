import {
  Datasource,
  GridInterface,
  GridConfig,
  Entity,
} from "@simple-html/grid";
import { UseBoundStore, StoreApi, create } from "zustand";
import { ServiceController } from "./ServiceController";
import { DataInterface } from "./DataInterface";

/**
 * helper for data
 * no need for edits
 */
export class DataController<T> {
  #datainterface: DataInterface<T>;
  #gridDatasource: Datasource<T>;
  #gridInterface: GridInterface<T>;
  #stateStore: UseBoundStore<StoreApi<DataControllerState>>;
  #initgridConfig: GridConfig;
  #service: ServiceController<T>;

  constructor(
    datainterface: DataInterface<T>,
    serviceController: ServiceController<T>
  ) {
    this.#datainterface = datainterface;
    this.#initgridConfig = this.#generateGridConfig();
    this.#gridDatasource = new Datasource<T>();
    this.#gridInterface = new GridInterface<T>(
      this.#initgridConfig,
      this.#gridDatasource
    );
    this.#stateStore = create<DataControllerState>(() => ({
      isLoading: false,
      isEditmode: false,
    }));

    this.#service = serviceController;
    this.#service.connectDataSource(this);

    this.#init();
  }

  /**
   * will use dataInterface to generate gridConfig
   * @returns
   */
  #generateGridConfig() {
    // a LOT to do here, havign it very simple for now
    console.log("TODO, generate gridConfig", this.#datainterface);

    const config = {
      columnsCenter: [] as unknown,
      attributes: [],
    } as GridConfig;

    this.#datainterface.columns.forEach((c) => {
      const primaryCol = this.#datainterface.primaryColumn;

      if (c.attribute == primaryCol) {
        config.attributes.push({ attribute: c.attribute, readonly: true });
      }

      config.columnsCenter.push({
        width: 100,
        rows: [c.attribute],
      });
    });

    return config;
  }

  /**
   * will add event listners etc to do most of logic here
   */
  #init() {
    this.#gridInterface.cellAppendClassSetter(
      (attribute: string, rowData: Entity, isReadOnly: boolean) => {
        const c = rowData.__controller;

        if (isReadOnly) {
          return { dimmedClass: "", inputClass: "" };
        }

        if (c && c?.__isNew) {
          return { dimmedClass: "new-cell", inputClass: "" };
        }

        if (c && c.__editedProps && c.__editedProps[attribute]) {
          return { dimmedClass: "edit-cell", inputClass: "" };
        }

        return { dimmedClass: "", inputClass: "" };
      }
    );
  }

  requestRefresh() {
    this.#service.callEventHandler({
      type: "REFRESH_ALL",
      data: null,
    });
  }

  requestFetchAll() {
    this.#service.callEventHandler({
      type: "FETCH_ALL",
      data: null,
    });
  }

  requestSaveChanges() {
    const changes = this.#gridDatasource.getChanges() as {
      newEntities: Partial<T>[];
      deletedEntities: Partial<T>[];
      modifiedEntities: Partial<T>[];
    };

    this.#service.callEventHandler({
      type: "CHANGE",
      data: changes,
    });
  }

  /**
   * could be usefull for filtering sub grids etc/calling other related
   * will need something for this
   * @param event
   */
  requestCustomEvent(event: ControllerEvent<T>) {
    this.#service.callEventHandler(event);
  }

  getStore() {
    return this.#stateStore;
  }

  getGridInterface() {
    return this.#gridInterface;
  }

  getGridDatasource() {
    return this.#gridDatasource;
  }
}

/////////////////////////////////////////////
// helper classes, dont want 1 file per
//////////////////////////////////////////////

export type DataControllerState = {
  isLoading: boolean;
  isEditmode: boolean;
};

export type DataChanges<T> = {
  newEntities: Partial<T>[];
  deletedEntities: Partial<T>[];
  modifiedEntities: Partial<T>[];
};

export type ControllerEvent<T> =
  | {
      type: "FETCH_ALL";
      data: null;
    }
  | {
      type: "REFRESH_ALL";
      data: null;
    }
  | {
      type: "CHANGE";
      data: DataChanges<T>;
    };
