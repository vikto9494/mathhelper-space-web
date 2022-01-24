export enum ConstructorCreationMode {
  CREATE = "CREATE",
  EDIT = "EDIT",
  CREATE_BY_EXAMPLE = "CREATE_BY_EXAMPLE",
}

export interface ReportStatisticsEntity {
  tasksetCode: String,
  tasksetVersion: number,
  taskCode: String,
  taskVersion: number,
  taskNameRu: String,
  taskNameEn: String,
  userCode: String,
  userLogin: String,
  userFullName: String,
  userAdditional: String,
  stepsNumber: number,
  timeMS: number,
  difficulty: number,
  clientActionTS: Date,
  appName: String
}
