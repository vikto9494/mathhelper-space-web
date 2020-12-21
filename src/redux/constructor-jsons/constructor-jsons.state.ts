import { ConstructorJSONs } from "./constructor-jsons.types";
import { MathInputFormat } from "../../utils/kotlin-lib-functions";

const CONSTRUCTOR_JSONS_INITIAL_STATE: ConstructorJSONs = {
  namespace: {
    nameEn: "",
    nameRu: "",
    code: "",
    allowEdit: "false",
    allowRead: "true",
    editGrantedUsers: "",
    readGrantedUsers: "",
    taskSetList: "",
  },
  rulePack: {
    code: "",
    nameEn: "",
    nameRu: "",
    namespaceCode: "",
    rulePacks: "",
    rules: [],
  },
  taskSet: {
    code: "",
    nameEn: "",
    nameRu: "",
    namespace: "",
    tasks: [
      {
        taskCreationType: "manual",
        nameEn: "",
        nameRu: "",
        code: "",
        namespace: "",
        subjectTypes: "",
        startExpression: {
          format: MathInputFormat.TEX,
          expression: "",
        },
        goalType: "",
        goalExpression: {
          format: MathInputFormat.TEX,
          expression: "",
        },
        goalNumberProperty: 0,
        goalPattern: "",
        rulePacks: "",
        stepsNumber: 0,
        time: 0,
        difficulty: 0,
        solution: {
          format: MathInputFormat.TEX,
          expression: "",
        },
        countOfAutoGeneratedTasks: 0,
        operations: "",
        stepsCountInterval: 0,
        implicitTransformationsCount: 0,
        autoGeneratedRulePacks: "",
        lightWeightOperations: "",
        nullWeightOperations: "",
        startTime: "",
        endTime: "",
      },
    ],
  },
};

export default CONSTRUCTOR_JSONS_INITIAL_STATE;
