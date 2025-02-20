// libs and hooks
import React, { useState } from "react";
import { useForm, useFormContext, useFieldArray, ArrayField } from "react-hook-form";
// custom constants
import { SUBJECT_TYPE_OPTIONS } from "../constants/constants";
// redux
import { connect, ConnectedProps } from "react-redux";
import { updateTaskSetJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
// context
import { TasksFieldArrayActionsContext } from "../task-set-constructor/task-set-constructor.component";
// custom components
import ActionButton from "../../components/action-button/action-button.component";
import ConstructorForm from "../../components/constructor-form/constructor-form";
// types
import { ActionButtonProps } from "../../components/action-button/action-button.types";
import { GoalType, TaskConstructorInputs, TaskConstructorProps } from "./task-constructor.types";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
import { TaskSetConstructorInputs } from "../task-set-constructor/task-set-constructor.types";
import { ConstructorFormInput } from "../../components/constructor-form/constructor-form.types";
import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types"
import TaskRuleConstructor from "./task-rule-constructor.component";
// data
import {
  allPossibleGoalTypes,
  mockSubjectTypes,
} from "./task-constructor.data";
// icons
import Icon from "@mdi/react";
import {
  mdiArrowDown,
  mdiArrowExpandDown,
  mdiArrowExpandLeft,
  mdiArrowExpandRight,
  mdiArrowExpandUp,
  mdiArrowUp,
  mdiClose,
  mdiContentCopy,
  mdiFileEye,
  mdiPlayCircle,
  mdiRobot,
  mdiWrench,
  mdiPlus,
} from "@mdi/js";
// styles
import "./task-constructor.styles.scss";
import { addMultipleLinesChangeToHistory } from "../../redux/constructor-history/constructor-history.actions";
import { taskRuleConstructorDefaultValues } from "./task-rule-constructor.data";

const TaskConstructor = ({
  // task constructor props
  index,
  defaultValue,
  isRendered,
  visualizationMode,
  rulePacks,
  // redux props
  updateTaskSetJSON,
  addMultipleLinesChangeToHistory,
}: TaskConstructorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const { taskCreationType } = defaultValue;

  // react-hook-form core functions from parent component's context
  // TaskConstructor should be wrapped inside FormProvider component
  const { control, getValues, watch } = useFormContext();

  // react-hook-form's fieldArray initialization and getting its needed tools
  // in order to manage rule constructors
  const { fields: fieldsRules, append: appendRule, swap: swapRule, remove: removeRule } = useFieldArray<RuleConstructorInputs>(  //TODO: support case rules=null
    {
      control,
      name: `tasks[${index}].rules`,
    }
  );

  // react-hook-form array-field functions
  // @ts-ignore
  const { append: appendTask, swap: swapTask, remove: removeTask } = React.useContext(
    TasksFieldArrayActionsContext
  );

  const [showAddFields, setShowAddFields] = useState(false);

  // watch in order to conditionally render dependent fields
  const goalTypeValue: string = watch(`tasks[${index}].goalType`);

  const inputs: ConstructorFormInput[] = [
    {
      name: `tasks[${index}].code`,
      label: "Код",
      type: "text",
    },
    {
      name: `tasks[${index}].nameRu`,
      label: "Имя Ru",
      type: "text",
    },
    {
      name: `tasks[${index}].nameEn`,
      label: "Имя En",
      type: "text",
    },
    {
      name: `tasks[${index}].descriptionShortRu`,
      label: "Краткое описание Ru",
      type: "text",
    },
    {
      name: `tasks[${index}].descriptionShortEn`,
      label: "Краткое описание En",
      type: "text",
    },
    {
      name: `tasks[${index}].descriptionRu`,
      label: "Описание Ru",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].descriptionEn`,
      label: "Описание En",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].subjectType`,
      label: "Предметная область",
      isMulti: false,
      options: SUBJECT_TYPE_OPTIONS,
    },
    {
      name: `tasks[${index}].tags`,
      label: "Теги",
      type: "text",
      isMulti: false,
      isTags: true,
      options: [],
    },
    {
      name: `tasks[${index}].rulePacks`,
      label: "Пакеты правил",
      type: "text",
      isMulti: true,
      options: rulePacks.map((rp: string) => ({ label: rp, value: rp })),
    },
    {
      name: `tasks[${index}].originalExpression`,
      label: "Стартовое выражение",
      type: "text",
      isExpressionInput: true,
    },
    {
      name: `tasks[${index}].goalType`,
      label: "Тип цели",
      options: allPossibleGoalTypes.map((item: string) => ({
        label: item,
        value: item,
      })),
      isMulti: false,
    },
    {
      name: `tasks[${index}].goalExpression`,
      label: "Целевое выражение",
      type: "text",
      isExpressionInput: true,
      isRendered:
        goalTypeValue !== GoalType.CNF && goalTypeValue !== GoalType.DNF,
    },
    {
      name: `tasks[${index}].stepsNumber`,
      label: "Количество шагов",
      type: "number",
    },
    {
      name: `tasks[${index}].time`,
      label: "Время",
      type: "number",
    },
    {
      name: `tasks[${index}].difficulty`,
      label: "Сложность",
      type: "number",
    },
    {
      name: `tasks[${index}].solution`,
      label: "Решение",
      type: "text",
      isExpressionInput: true,
    },
    {
      name: `tasks[${index}].goalPattern`,
      label: "Патерн цели",
      type: "text",
    },
    {
      name: `tasks[${index}].countOfAutoGeneratedTasks`,
      label: "Количество автогенерируемых подуровней",
      type: "number",
    },
    {
      name: `tasks[${index}].otherGoalData`,
      label: "Дополнительная информация о цели задачи",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].otherCheckSolutionData`,
      label: "Дополнительная информация о проверке решения",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].otherAwardData`,
      label: "Дополнительная информация о награде",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].otherAutoGenerationData`,
      label: "Дополнительная информация об автогенерации",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].solutionsStepsTree`,
      label: "solutionsStepsTree",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].hints`,
      label: "hints",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].interestingFacts`,
      label: "interestingFacts",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].nextRecommendedTasks`,
      label: "nextRecommendedTasks",
      type: "text",
      isTextArea: true,
    },
    {
      name: `tasks[${index}].otherData`,
      label: "Дополнительная информация",
      type: "text",
      isTextArea: true,
    },
  ];

  const manualTaskBasicInputsNames = [
    "nameEn",
    "nameRu",
    "code",
    "descriptionShortRu",
    "descriptionShortEn",
    "subjectType",
    "rulePacks",
    "originalExpression",
    "goalType",
    "goalExpression",
    "goalNumberProperty",
    "goalPattern",
  ];

  const autoTaskBasicInputsNames = [
    "nameEn",
    "nameRu",
    "code",
    "operations",
    "subjectTypes",
    "stepsCountInterval",
    "implicitTransformationsCount",
    "autoGeneratedRulePacks",
  ];

  // get basic inputs
  const [manualTaskBasicInputs, autoTaskBasicInputs] = [
    manualTaskBasicInputsNames,
    autoTaskBasicInputsNames,
  ].map((basicInputNames: string[]) => {
    return inputs.filter((input: ConstructorFormInput) => {
      const prefix = `tasks[${index}].`;
      const { name } = input;
      return basicInputNames.includes(name.replace(prefix, ""));
    });
  });

  // get additional inputs
  const [manualTasksAddInputs, autoTasksAddInputs] = [
    manualTaskBasicInputs,
    autoTaskBasicInputs,
  ].map((basicInputs: ConstructorFormInput[]) => {
    return inputs
      .filter((input: ConstructorFormInput) => {
        return !basicInputs.includes(input);
      })
      .map((input: ConstructorFormInput) => {
        return {
          ...input,
          isVisible:
            input.isVisible === undefined
              ? showAddFields
              : input.isVisible && showAddFields,
        };
      });
  });

  const updateTasks = async (action: () => Promise<void>) => {
    const oldValue = await getValues();
    await action();
    const newValue = await getValues();

    console.log(`oldValue: ${JSON.stringify(oldValue)}`)
    console.log(`newValue: ${JSON.stringify(newValue)}`)

    // @ts-ignore
    addMultipleLinesChangeToHistory(oldValue, getValues());
    // @ts-ignore
    updateTaskSetJSON(getValues());
  };

  const onAddRule = async () => {
    console.log("onAddRule");
    await updateTasks(async () => {
      await appendRule({ ...taskRuleConstructorDefaultValues });
    });
  };

  const tableActionButtonsLeft: ActionButtonProps[] = [
    {
      mdiIconPath: mdiContentCopy,
      size: 1.5,
      async action() {
        await updateTasks(async () => {
          await appendTask({
            taskCreationType: taskCreationType,
            ...getValues().tasks[index],
          });
        });
      },
    },
    {
      mdiIconPath: mdiArrowUp,
      size: 1.5,
      async action() {
        if (index !== 0) {
          await updateTasks(async () => {
            await swapTask(index, index - 1);
          });
        }
      },
    },
    {
      mdiIconPath: mdiArrowDown,
      size: 1.5,
      async action() {
        if (index !== getValues().tasks.length - 1) {
          await updateTasks(async () => {
            await swapTask(index, index + 1);
          });
        }
      },
    },
  ];

  const tableActionButtonsRight: ActionButtonProps[] = [
    {
      mdiIconPath: mdiClose,
      size: 2,
      async action() {
        if (window.confirm(`Вы точно хотите удалить уровень ${index + 1}?`)) {
          await updateTasks(async () => await removeTask(index));
        }
      },
    },
    {
      mdiIconPath: mdiFileEye,
      size: 2,
      action() { },
    },
    {
      mdiIconPath: mdiPlayCircle,
      size: 2,
      action() { },
    },
  ];

  const rulesActionButtons: ActionButtonProps[] = [
    {
      mdiIconPath: mdiContentCopy,
      size: 1.5,
      async action(ruleIndex: number) {
        await updateTasks(async () => await appendRule(getValues().tasks[index].rules[ruleIndex]));
      },
    },
    {
      mdiIconPath: mdiArrowUp,
      size: 1.5,
      async action(ruleIndex: number) {
        if (ruleIndex !== 0) {
          await updateTasks(async () => await swapRule(ruleIndex, ruleIndex - 1));
        }
      },
    },
    {
      mdiIconPath: mdiArrowDown,
      size: 1.5,
      async action(ruleIndex: number) {
        // @ts-ignore
        if (ruleIndex !== getValues().tasks[index].rules.length - 1) {
          await updateTasks(async () => await swapRule(ruleIndex, ruleIndex + 1));
        }
      },
    },
    {
      mdiIconPath: mdiClose,
      size: 2,
      async action(ruleIndex: number) {
        if (window.confirm(`Вы точно хотите удалить правило ${ruleIndex + 1}?`)) {
          await updateTasks(async () => await removeRule(ruleIndex));
        }
      },
    },
  ];

  const listTopActionButtons: ActionButtonProps[] = tableActionButtonsLeft
    .concat(tableActionButtonsRight)
    .map((item: ActionButtonProps) => {
      return { ...item, size: 1.5 };
    });

  const isTable = (): boolean => visualizationMode === "table";

  if (!isRendered) {
    if (isTable()) {
      return (
        <div className="task-constructor-table">
          {tableActionButtonsLeft.map((button: ActionButtonProps) => {
            return (
              <div
                key={button.mdiIconPath}
                className="task-constructor-table__icon"
              >
                <ActionButton {...button} />
              </div>
            );
          })}
          <div className="task-constructor-table__icon">{index + 1}.</div>
          <div className="task-constructor-table__icon">
            <Icon
              path={taskCreationType === "auto" ? mdiRobot : mdiWrench}
              size={2}
            />
          </div>
          <ConstructorForm
            inputs={
              taskCreationType === "auto"
                ? autoTaskBasicInputs.concat(autoTasksAddInputs)
                : manualTaskBasicInputs.concat(manualTasksAddInputs)
            }
            constructorType={ConstructorJSONType.TASK_SET}
            showUndoRedoPanel={false}
            className="task-constructor-table__inputs"
          />
          <div className="task-constructor-table__icon">
            <ActionButton
              mdiIconPath={
                showAddFields ? mdiArrowExpandLeft : mdiArrowExpandRight
              }
              size={2}
              action={() => setShowAddFields(!showAddFields)}
            />
          </div>
          {tableActionButtonsRight.map((button: ActionButtonProps) => {
            return (
              <div
                key={button.mdiIconPath}
                className="task-constructor-table__icon"
              >
                <ActionButton {...button} />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="task-constructor-list">
          <div className="task-constructor-list__top-action-buttons">
            {listTopActionButtons.map(
              (button: ActionButtonProps, i: number) => {
                return <ActionButton key={i} {...button} />;
              }
            )}
          </div>
          <ConstructorForm
            inputs={
              taskCreationType === "auto"
                ? autoTaskBasicInputs.concat(autoTasksAddInputs)
                : manualTaskBasicInputs.concat(manualTasksAddInputs)
            }
            constructorType={ConstructorJSONType.TASK_SET}
            showUndoRedoPanel={false}
          />
          <h3>Правила:</h3>
          <div className="rule-pack-constructor__rules">
            {fieldsRules.map(
              (
                field: Partial<ArrayField<RuleConstructorInputs, "id">>,
                fieldIdx: number
              ) => {
                return (
                  <div className="rule-pack-constructor__rule" key={fieldIdx}>
                    <b>{fieldIdx + 1}.</b>
                    <div className="rule-pack-constructor__action-buttons">
                      {rulesActionButtons.map(
                        (button: ActionButtonProps, buttonIdx: number) => {
                          return (
                            <ActionButton
                              key={buttonIdx}
                              mdiIconPath={button.mdiIconPath}
                              size={1.5}
                              action={() => {
                                button.action(fieldIdx);
                              }}
                              margin="0 1rem 0 0"
                            />
                          );
                        }
                      )}
                    </div>
                    <TaskRuleConstructor
                      key={field.id}
                      index={fieldIdx}
                      taskIndex={index}
                      defaultValue={fieldsRules[fieldIdx]}
                    />
                  </div>
                );
              }
            )}
            <div className="rule-pack-constructor__action-buttons">
              <button
                type="button"
                className="btn u-mr-sm"
                onClick={async () => {
                  await onAddRule();
                }}
              >
                <Icon path={mdiPlus} size={1.2} />
                <span>правило</span>
              </button>
            </div>
          </div>
          <ActionButton
            mdiIconPath={showAddFields ? mdiArrowExpandUp : mdiArrowExpandDown}
            size={2}
            action={() => setShowAddFields(!showAddFields)}
            margin={"2rem 0 0 0"}
          />
        </div>
      );
    }
  } else {
    return <></>;
  }
};

// connecting redux
const mapDispatchToProps = (dispatch: any) => ({
  updateTaskSetJSON: (taskSetJSON: TaskSetConstructorInputs) =>
    dispatch(updateTaskSetJSON(taskSetJSON)),
  addMultipleLinesChangeToHistory: (
    oldVal: TaskSetConstructorInputs,
    newVal: TaskSetConstructorInputs
  ) =>
    dispatch(
      addMultipleLinesChangeToHistory({
        oldVal,
        newVal,
        constructorType: ConstructorJSONType.TASK_SET,
      })
    ),
});

const connector = connect(null, mapDispatchToProps);

export default connector(TaskConstructor);
