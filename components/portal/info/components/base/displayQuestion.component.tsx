import React, { useState } from "react";
import {
  formatDate,
  getPropertiesQuestionClient,
  getPropertyValueMap,
} from "shared/helpers";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import { Add, Minus } from "components/icons";
import { usePortalStore } from "store/portal";

interface IValueType {
  valueType: string;
  suffix: string;
  key: string;
}

interface Props {
  colNames: any;
  question: any;
  cols: any;
  isMultiple?: boolean;
  valueTypes?: IValueType[];
}

const DisplayQuestion = ({
  colNames,
  question,
  cols,
  isMultiple = false,
  valueTypes = [],
}: Props) => {
  let questions: any[] = [];
  let title: string = "";
  const { questionPresentation } = usePortalStore();

  if (isMultiple) {
    questions = question;
    title = question[0].groupValue;
  } else {
    questions.push(question);
    title = question.groupValue;
  }

  if (valueTypes.length === 0) {
    colNames.map((colName: any) => {
      valueTypes.push({
        valueType: colName.valueType,
        suffix: "",
        key: colName.key,
      });
    });
  }

  const [open, setOpen] = useState(false);
  let [ref, { height }] = useMeasure();

  const getValues = (propertyValue: any) => {
    const values = propertyValue?.toString().split("|");

    return values;
  };

  const getValueType = (propertyKey: any) => {
    const value = valueTypes.filter((v) => v.key === propertyKey)[0].valueType;

    return value;
  };

  const getKeyValue = (
    propertyKey: any,
    propertyValue: any,
    suffix: string
  ) => {
    let valueType = getValueType(propertyKey);
    let value = propertyValue;
    switch (valueType) {
      case "number":
        value = Number(value).toLocaleString("es-AR");
        break;
      case "date":
        value = formatDate(value, "short", "es");
        break;
      default:
        value = getPropertyValueMap(value);
        break;
    }

    return suffix ? value + " " + suffix : value;
  };

  return (
    <>
      {questionPresentation === "minimal" && (
        <MotionConfig transition={{ duration: 0.3 }}>
          <div className="bg-white mb-2 rounded-lg  overflow-hidden">
            <div className="p-2 border-b flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700">{title}</p>
              <button className=" text-gray-700" onClick={() => setOpen(!open)}>
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
                    <div
                      className={`grid grid-cols-${
                        cols / 2
                      } gap-x8 gap-y-2 p-2`}
                    >
                      {colNames.map((colProp: any) => (
                        <div key={colProp.key}>
                          <p className="text-gray-400 pb-0.5 text-sm">
                            {colProp.title}
                          </p>

                          {questions.map((q: any, index) => (
                            <motion.div
                              className="text-gray-700 text-sm"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              key={index}
                            >
                              {getValues(
                                getPropertiesQuestionClient(
                                  colProp.key,
                                  q.properties
                                ).find((p: any) => p.propertyKey == colProp.key)
                                  .propertyValue
                              ).map((v: any) => (
                                <div key={v} className="text-xs">
                                  {valueTypes.length > 0 && !isMultiple && (
                                    <>
                                      {getKeyValue(
                                        getPropertiesQuestionClient(
                                          colProp.key,
                                          q.properties
                                        ).find(
                                          (p: any) =>
                                            p.propertyKey == colProp.key
                                        ).propertyKey,
                                        getPropertiesQuestionClient(
                                          colProp.key,
                                          q.properties
                                        ).find(
                                          (p: any) =>
                                            p.propertyKey == colProp.key
                                        ).propertyValue,
                                        colNames.find(
                                          (c: any) => c.key == colProp.key
                                        ).suffix
                                      )}
                                    </>
                                  )}
                                  <>
                                    {valueTypes.length > 0 && isMultiple && (
                                      <>
                                        {getKeyValue(
                                          getPropertiesQuestionClient(
                                            colProp.key,
                                            q.properties
                                          ).find(
                                            (p: any) =>
                                              p.propertyKey == colProp.key
                                          ).propertyKey,
                                          getPropertiesQuestionClient(
                                            colProp.key,
                                            q.properties
                                          ).find(
                                            (p: any) =>
                                              p.propertyKey == colProp.key
                                          ).propertyValue,
                                          colNames.find(
                                            (c: any) => c.key == colProp.key
                                          ).suffix
                                        )}
                                      </>
                                    )}
                                  </>
                                </div>
                              ))}
                            </motion.div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          </div>
        </MotionConfig>
      )}

      {questionPresentation === "detailed" && (
        <div className="bg-white rounded-lg border mb-4">
          <div className="p-2 border-b flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-700">{title}</p>
          </div>

          <div className={`grid grid-cols-${cols / 2} gap-x8 gap-y-2 p-2`}>
            {colNames.map((colProp: any) => (
              <div key={colProp.key}>
                <p className="text-gray-400 pb-0.5 text-sm">{colProp.title}</p>

                {questions.map((q: any, index) => (
                  <div className="text-gray-700 text-sm" key={index}>
                    {getValues(
                      getPropertiesQuestionClient(
                        colProp.key,
                        q.properties
                      ).find((p: any) => p.propertyKey == colProp.key)
                        .propertyValue
                    ).map((v: any) => (
                      <div key={v} className="text-xs">
                        {valueTypes.length > 0 && !isMultiple && (
                          <>
                            {getKeyValue(
                              getPropertiesQuestionClient(
                                colProp.key,
                                q.properties
                              ).find((p: any) => p.propertyKey == colProp.key)
                                .propertyKey,
                              getPropertiesQuestionClient(
                                colProp.key,
                                q.properties
                              ).find((p: any) => p.propertyKey == colProp.key)
                                .propertyValue,
                              colNames.find((c: any) => c.key == colProp.key)
                                .suffix
                            )}
                          </>
                        )}
                        <>
                          {valueTypes.length > 0 && isMultiple && (
                            <>
                              {getKeyValue(
                                getPropertiesQuestionClient(
                                  colProp.key,
                                  q.properties
                                ).find((p: any) => p.propertyKey == colProp.key)
                                  .propertyKey,
                                getPropertiesQuestionClient(
                                  colProp.key,
                                  q.properties
                                ).find((p: any) => p.propertyKey == colProp.key)
                                  .propertyValue,
                                colNames.find((c: any) => c.key == colProp.key)
                                  .suffix
                              )}
                            </>
                          )}
                        </>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayQuestion;
