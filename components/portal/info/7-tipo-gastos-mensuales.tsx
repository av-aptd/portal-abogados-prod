import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getPropertyValueMap, getQuestionClient } from "shared/helpers";
import React, { useState } from "react";
import DisplayQuestion from "./components/base/displayQuestion.component";
import { COLUMNS_DISPLAY } from "./components/base/settings/colNames.enum";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import { Add, Minus } from "components/icons";
import { tipoGastosDict } from "shared/dictionaries/tipoGastosDict";
import { usePortalStore } from "store/portal";

const TipoGastosMensuales = ({ clientInfo }: any) => {
  const [open, setOpen] = useState(false);
  let [ref, { height }] = useMeasure();
  const { questionPresentation } = usePortalStore();

  const question = getQuestionClient(
    clientInfo,
    QUESTIONS_GROUP_KEY.TIPO_GASTOS
  )[0];

  interface IPropValue {
    value: string;
    icon: string;
  }

  const getValues = (propertyValue: any) => {
    let values: IPropValue[] = [];

    JSON.parse(propertyValue).map((value: any) => {
      values.push({
        value: value,
        icon: "",
      });
    });

    return values;
  };

  return (
    <>
      {question !== undefined && questionPresentation === "minimal" && (
        <MotionConfig transition={{ duration: 0.3 }}>
          <div className="bg-white mb-2 rounded-lg  overflow-hidden">
            <div className="p-2 border-b flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700">
                {question.groupValue}
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
                      {question.properties.map((q: any) => (
                        <div key={q.id}>
                          {getValues(q.propertyValue).map((v: any) => (
                            <div
                              className="text-sm text-gray-700 pb-1 pl-4"
                              key={v.value}
                            >
                              {getPropertyValueMap(v.value, "", tipoGastosDict)}
                            </div>
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
      {question !== undefined && questionPresentation === "detailed" && (
        <div className="bg-white rounded-lg border mb-8">
          <div className="p-2 border-b flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-700">
              {question.groupValue}
            </p>
          </div>

          <div className={`py-2`}>
            {question.properties.map((q: any) => (
              <div key={q.id}>
                {getValues(q.propertyValue).map((v: any) => (
                  <div
                    className="text-sm text-gray-700 pb-1 pl-4"
                    key={v.value}
                  >
                    {getPropertyValueMap(v.value, "", tipoGastosDict)}
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

export default TipoGastosMensuales;
