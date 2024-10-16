// early... will change my mind here..

import { DataTypes } from "@simple-html/grid";

/**
 * configuration for dataController/service
 * want to try and have most as optional
 */
export type DataInterface<T> = {
  /**
   * primary key, will use for selection during reload/delete/update
   * either 1 or many to generate key
   * important you dont use null columns here
   * project code is not part of this..
   * except this to be unique and autogenerated on db side... (might need to rethink this...)
   */
  primaryColumn: keyof T;

  /**
   * todo - will disable button
   * maybe option to hide by default?
   */
  isEditAllowed: boolean;
  /**
   * todo - will disable button
   * maybe option to hide by default?
   */
  isDeleteAllowed: boolean;
  /**
   * todo - will disable button, including duplicate
   * maybe option to hide by default?
   */
  isNewAllowed: boolean;

  /**
   * columns we can edit/ custom headername etc
   */
  columns: DataInterfaceColumn<T>[];

  /**
   * sort order
   */
  sortOrder?: {
    attribute: keyof T;
    ascending: boolean;
  }[];

  /**
   * col group cells
   * so its easier to reason about
   * if not set it uses order of columns
   */
  groupCells?: string[][];

  /**
   * column width, default to 100
   */
  colWidth?: number[];

  /**
   * modified
   * to get updated without getting all
   */
  modified?: keyof T;

  /**
   * deleted column
   * only when fetchig data.
   * if this is set it will set this to false value on first fetch
   * if update, then we get all, but use this to filter rows to remove
   */
  deleted?: { columnName: keyof T; trueValue: string };

  /**
   * import meta column to show in change log
   * only for import dialog from excel, might want related data
   */
  importColumns?: Record<keyof T, keyof T | keyof T[]>;
};

export type DataInterfaceColumn<T> = {
  /**
   * name of attribute
   */
  attribute: keyof T;

  /**
   * helper to know if its readonly
   */
  readOnly?: boolean;

  /**
   * what to use in grid/labels
   * if missing we should make it pretty
   */
  label?: string;

  /**
   * type of data, defaults to text
   */
  type: DataTypes | undefined;

  /**
   *  default false
   *  for hiding data from user/helper columns
   */
  removeFromGrid?: boolean;

  /**
   *  default false
   */
  setAsOptionalInGrid?: boolean;

  /**
   * read only in grid (column)
   * default false
   */
  readOnlyGrid?: boolean;

  /**
   * to set null values to 0
   */
  blankToZero?: boolean;

  /**
   * default value on new
   */
  defaultValue?: null | string | Date | number;

  /**
   * dynamic if column
   */
  readOnlyIf?: {
    ifColumn: string;
    operator:
      | "$GT$"
      | "$LT$"
      | `$EQ$`
      | `$NEQ$`
      | `$GTEQ$`
      | `$LTEQ$`
      | "$NBLANK$"
      | "$BLANK$";
    value: unknown;
  };

  /**
   * blue in grid cell if empty, so user knows they need to fill in
   * will be up to service controller/api to force value/show error
   */
  mandatory?: boolean;

  /**
   * parent_view api to use, will bring button on for opening dialog
   * parent is like cabletype on a drum or company on a person.
   */
  parentDataInterface?: {
    name: string;
    /**
     * title on dialog
     */
    title: string;

    /**
     * parent api column to get
     */
    columnFrom: keyof T;

    /**
     * column to insert value from parent
     */
    columnTo: keyof T;

    /**
     * parent column to update, using par string,string
     * [[fromParentColumn, toChildColumn],[fromParentColumn, toChildColumn]]
     * useful if you have many columns from parent, also depends on view
     * this is also used when doing copy/paste and you need to update related at the same time
     */
    columnsFromTo?: [string, string][];
  };
};
