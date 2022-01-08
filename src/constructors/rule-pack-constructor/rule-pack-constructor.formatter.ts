import {
  RulePackConstructorInputs,
  RulePackConstructorReceivedForm,
  RulePackConstructorSendForm,
  RulePackLink,
} from "./rule-pack-constructor.types";
import {
  convertMathInput,
  MathInputFormat,
} from "../../utils/kotlin-lib-functions";
import {
  ExpressionInput
} from "../task-constructor/task-constructor.types";
import {
  RuleConstructorInputs,
  RuleConstructorReceivedForm, RuleConstructorSendForm,
} from "../rule-constructor/rule-constructor.types";

class RulePackConstructorFormatter {
  public static convertReceivedFormToConstructorInputs(
    data: RulePackConstructorReceivedForm
  ): RulePackConstructorInputs {
    const res = {
      ...data,
      rulePacks: data.rulePacks?.map((rp: RulePackLink) => {
        return rp.rulePackCode;
      }),
    };
    console.log("RulePackConstructorFormatter rulePacks" + JSON.stringify(res.rules));
    if (res.rules) {
      res.rules = res.rules.map((rule: RuleConstructorReceivedForm) => {
        const formattedRule: RuleConstructorReceivedForm = { ...rule };
        if (formattedRule.hasOwnProperty("leftStructureString")) {
          delete formattedRule.leftStructureString;
        }
        if (formattedRule.hasOwnProperty("rightStructureString")) {
          delete formattedRule.rightStructureString;
        }
        return formattedRule;
      });
    }

    res.otherCheckSolutionData = JSON.stringify(data.otherCheckSolutionData);
    res.otherAutoGenerationData = JSON.stringify(data.otherAutoGenerationData);
    res.otherData = JSON.stringify(data.otherData);

    return res;
  }

  public static convertConstructorInputsToSendForm(
    data: RulePackConstructorInputs
  ): RulePackConstructorSendForm {
    const res = { ...data };
    console.log("convertConstructorInputsToSendForm rulePacks" + JSON.stringify(res.rules));
    if (res.rulePacks) {
      // @ts-ignore
      res.rulePacks = res.rulePacks.map((code: string) => ({
        rulePackCode: code,
        namespaceCode: data.namespaceCode
      }));
    }

    if (res.rules) {
      res.rules = res.rules.map((rule: RuleConstructorInputs) => {
        const formattedRule = { ...rule } as RuleConstructorSendForm;

        if (!rule.left && !rule.right) {
          return formattedRule;
        }

        // @ts-ignore

        const left = rule.left as ExpressionInput;
        formattedRule.leftStructureString = convertMathInput(
            left.format,
          MathInputFormat.STRUCTURE_STRING,
          rule.left!!.expression
        );
        // @ts-ignore
        const right = rule.right as ExpressionInput;
        formattedRule.rightStructureString = convertMathInput(
            right.format,
          MathInputFormat.STRUCTURE_STRING,
          rule.right!!.expression
        );
        return formattedRule;
      });
    }

    res.otherCheckSolutionData = JSON.parse(data.otherCheckSolutionData);
    res.otherAutoGenerationData = JSON.parse(data.otherAutoGenerationData);
    res.otherData = JSON.parse(data.otherData);

    // @ts-ignore
    return res;
  }
}

export default RulePackConstructorFormatter;
