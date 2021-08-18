import { ConstructorJSONs } from "./constructor-jsons.types";
import { GoalType } from "../../constructors/task-constructor/task-constructor.types";
import { MathInputFormat } from "../../utils/kotlin-lib-functions";
import { NamespaceGrantType } from "../../constructors/namespace-constructor/namespace-constructor.types";

const CONSTRUCTOR_JSONS_INITIAL_STATE: ConstructorJSONs = {
  isNamespaceJSONValid: true,
  isRulePackJSONValid: true,
  isTaskSetJSONValid: true,
  namespace: {
    code: "",
    allowRead: "true",
    grantType: NamespaceGrantType.PUBLIC_READ_PRIVATE_WRITE,
    writeGrantedUsers: [],
    readGrantedUsers: [],
  },
  rulePack: {
    code: "",
    descriptionEn: "",
    descriptionRu: "",
    descriptionShortEn: "",
    descriptionShortRu: "",
    nameEn: "",
    nameRu: "",
    namespaceCode: "",
    subjectType: "",
    rulePacks: [],
    rules: [
      {
        nameRu: "",
        nameEn: "",
        code: "",
        basedOnTaskContext: "true",
        descriptionEn: "",
        descriptionRu: "",
        descriptionShortEn: "",
        descriptionShortRu: "",
        normalizationType: "",
        isExtending: "true",
        weight: 0,
        matchJumbledAndNested: "true",
        right: {
          expression: "",
          format: MathInputFormat.TEX,
        },
        left: {
          expression: "",
          format: MathInputFormat.TEX,
        },
        priority: 0,
        simpleAdditional: "true",
      },
    ],
  },
  taskSet: {
    code: "",
    namespaceCode: "",
    nameEn: "",
    nameRu: "",
    subjectType: "",
    recommendedByCommunity: false,
    otherData: "",
    descriptionEn: "",
    descriptionRu: "",
    descriptionShortEn: "",
    descriptionShortRu: "",
    tasks: [
      {
        taskCreationType: "manual",
        namespaceCode: "",
        code: "",
        nameEn: "",
        nameRu: "",
        descriptionShortRu: "",
        descriptionShortEn: "",
        descriptionRu: "",
        descriptionEn: "",
        subjectType: "",
        originalExpression: {
          format: MathInputFormat.TEX,
          expression: "",
        },
        goalType: GoalType.CUSTOM,
        goalExpression: {
          format: MathInputFormat.TEX,
          expression: "",
        },
        goalPattern: "",
        otherGoalData: "",
        rulePacks: [],
        stepsNumber: 0,
        time: 0,
        difficulty: 0,
        solution: {
          format: MathInputFormat.TEX,
          expression: "",
        },
        solutionsStepsTree: "",
        rules: [
          {
            nameRu: "",
            nameEn: "",
            code: "",
            basedOnTaskContext: "true",
            descriptionEn: "",
            descriptionRu: "",
            descriptionShortEn: "",
            descriptionShortRu: "",
            normalizationType: "",
            isExtending: "true",
            weight: 0,
            matchJumbledAndNested: "true",
            right: {
              expression: "",
              format: MathInputFormat.TEX,
            },
            left: {
              expression: "",
              format: MathInputFormat.TEX,
            },
            priority: 0,
            simpleAdditional: "true",
          },
        ],
        hints: "",
        otherCheckSolutionData: "",
        countOfAutoGeneratedTasks: 0,
        otherAutoGenerationData: "",
        interestingFacts: "",
        otherAwardData: "",
        nextRecommendedTasks: "",
        otherData: "",
      },
    ],
  },
};

export default CONSTRUCTOR_JSONS_INITIAL_STATE;
