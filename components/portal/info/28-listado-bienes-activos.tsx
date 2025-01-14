import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import {
  formatDate,
  getPropertyValueMap,
  getQuestionClient,
  QUESTION_OPERATORS,
} from "shared/helpers";
import React, { useState } from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";
import { plantillaTrabajadoresDict } from "shared/dictionaries/plantillaTrabajadoresDict";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import { Add, Minus } from "components/icons";

interface IPropValue {
  value: string;
  label: string;
}

const ListadoBienesActivos = ({ clientInfo }: any) => {
  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.LISTADO_BIENES_ACTIVOS,
    QUESTION_OPERATORS.STARTS_WITH
  );

  const [open, setOpen] = useState(false);
  let [ref, { height }] = useMeasure();

  const valueType = (value: any) => {
    const isNumber = !isNaN(value);
    if (isNumber) {
      return "number";
    }
    const isDate = !isNaN(Date.parse(value));
    if (isDate) {
      return "date";
    }
    return "string";
  };

  const formatToNumber = (value: any) => {
    const isNumber = !isNaN(value);
    if (isNumber) {
      return Number(value).toLocaleString("es-AR");
    }
    return value;
  };

  const formatToDate = (value: any) => {
    const isDate = !isNaN(Date.parse(value));
    if (isDate) {
      return formatDate(value, "short", "es");
    }
    return value;
  };

  const printProperty = (propertyValue: any) => {
    let values: IPropValue[] = [];

    const value = JSON.parse(propertyValue);
    Object.keys(value).map((key: any) => {
      switch (valueType(value[key])) {
        case "number":
          value[key] = formatToNumber(value[key]);
          break;
        case "date":
          value[key] = formatToDate(value[key]);
          break;
        default:
          value[key] = getPropertyValueMap(
            value[key],
            "",
            plantillaTrabajadoresDict
          );
          break;
      }

      const suffix = plantillaTrabajadoresDict.find(
        (p) => p.propertyValue == key
      )?.suffix;

      if (suffix != "") {
        value[key] = `${value[key]} ${suffix}`;
      }

      values.push({
        value: value[key],
        label: getPropertyValueMap(key, "", plantillaTrabajadoresDict),
      });
    });

    return values;
  };

  return (
    <>
      {question !== undefined && question.length > 0 && (
        <MotionConfig transition={{ duration: 0.3 }}>
          <div className="bg-white mb-2 rounded-lg  overflow-hidden">
            <div className="p-2 border-b flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700">
                {question[0].groupValue}
              </p>
              <button className=" text-gray-500" onClick={() => setOpen(!open)}>
                <span className="ml-6 flex h-7 items-center">
                  {open ? (
                    <Minus className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Add className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </button>
            </div>

            <motion.div animate={{ height }}>
              <div ref={ref}>
                {open && (
                  <AnimatePresence>
                    <div className={`py-2`}>
                      {question.length > 0 && (
                        <>
                          {question.map((q: any) => (
                            <div
                              key={q.id}
                              className="border rounded-md mb-4 p-2"
                            >
                              {q.properties.map((q: any) => (
                                <div
                                  key={q.id}
                                  className="grid grid-cols-2 gap-2"
                                >
                                  {printProperty(q.propertyValue).map((p) => (
                                    <div key={p.value}>
                                      <p className="text-sm text-gray-500">
                                        {p.label}:
                                      </p>{" "}
                                      <p className="text-gray-700 text-sm">
                                        {p.value}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          </div>
        </MotionConfig>
      )}
    </>
  );
};

export default ListadoBienesActivos;
