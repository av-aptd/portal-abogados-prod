import React, { useState } from "react";
import {
  getPropertyAnswerLead,
  getPropertyValueMap,
  getPropertiesQuestionClient,
  formatDate,
} from "shared/helpers";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import { Add, Minus } from "components/icons";

type valueType = "number" | "string" | "date" | "object";

const DisplayLeadQuestion = ({
  colNames,
  question,
  cols,
  isMultiple = false,
  suffix = "",
  valueType = "string",
}: any) => {
  let questions: any[] = [];
  let title: string = "hhhhh";

  if (isMultiple) {
    questions = question;
    title = question[0].groupValue;
  } else {
    questions.push(question);
    title = question?.title;
  }

  const [open, setOpen] = useState(false);
  let [ref, { height }] = useMeasure();

  const getPropertiesValues = (value: any) => {
    let obj: any;
    try {
      if (valueType === "object") {
        obj = JSON.parse(value);
      } else {
        let objValue = value;

        switch (valueType) {
          case "number":
            objValue = Number(value).toLocaleString("es-AR");
            break;
          case "date":
            objValue = formatDate(value, "short", "es");
            break;
          default:
            objValue = value;
            break;
        }

        obj = {
          default: suffix.length > 0 ? objValue + " " + suffix : objValue,
        };
      }
    } catch (e) {
      obj = {
        default: value,
      };
    }

    let propertiesValues: any[] = [];

    Object.keys(obj).map((key) => {
      propertiesValues.push({ propertyKey: key, propertyValue: obj[key] });
    });

    console.log("propertiesValues", propertiesValues);
    return propertiesValues;
  };

  return (
    <MotionConfig transition={{ duration: 0.3 }}>
      <div className="bg-white mb-2 rounded-lg  overflow-hidden">
        <div className="p-2 border-b flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-700">{title}</p>
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
                <div
                  className={`grid lg:grid-cols-${cols / 2} gap-x8 gap-y-2 p-2`}
                >
                  {colNames.map((colProp: any) => (
                    <div key={colProp.key}>
                      <p className="text-gray-400 pb-0.5 text-sm">
                        {colProp.title}
                      </p>

                      {questions.map((q: any, index) => (
                        <motion.div
                          className="text-gray-500 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          key={index}
                        >
                          {getPropertyValueMap(
                            getPropertyAnswerLead(
                              colProp.key,
                              getPropertiesValues(q.selected)
                            )[0].propertyValue
                          )}

                          {/* {getValues(
                            getPropertiesQuestionClient(
                              colProp.key,
                              q.properties
                            ).find((p) => p.propertyKey == colProp.key)
                              .propertyValue
                          ).map((v: any) => (
                            <div key={v}>
                              {isPropertyValueJsonFormat
                                ? getPropertiesValues(v).map(
                                    (p: any, index) => (
                                      <div className="mb-4" key={index}>
                                        <div className="text-sm">
                                          {p.propertyKey}
                                        </div>
                                        <div className="">
                                          {getPropertyValueMap(
                                            `${p.propertyValue}`,
                                            p.propertyKey
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )
                                : getPropertyValueMap(v)}{" "}
                              {colProp.suffix}
                            </div>
                          ))} */}
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
  );
};

export default DisplayLeadQuestion;
