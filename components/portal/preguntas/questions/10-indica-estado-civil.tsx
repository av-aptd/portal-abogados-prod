import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import Nav from "../nav";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `<p>Indícanos cuál tu estado civil actual.</p>
`,
];

const IndicaEstadoCivil = () => {
  const answer = usePreguntasStore((state) => state.answer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const profile = usePortalStore((state) => state.profile);
  const setHelp = useUIStore((state) => state.setHelp);

  useEffect(() => {
    setHelp(help);
  }, []);

  const nextStep = () => {
    if (answer.selected === "soltero" || answer.selected === "viudo") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "indicaestadocivil",
        groupNextKey: "autonomoopersonafisica",
        properties: [
          {
            propertyKey: "estadoCivil",
            propertyValue: answer.selected,
          },
        ],
      });

      setCurrentQuestion("autonomoopersonafisica");
    }
    if (answer.selected === "casado") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "indicaestadocivil",
        groupNextKey: "datosconyuge",
        properties: [
          {
            propertyKey: "estadoCivil",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("datosconyuge");
    }
    if (answer.selected === "divorciado") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "indicaestadocivil",
        groupNextKey: "existenmedidasreguladoras",
        properties: [
          {
            propertyKey: "estadoCivil",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("existenmedidasreguladoras");
    }
    if (answer.selected === "pareja") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "indicaestadocivil",
        groupNextKey: "datospareja",
        properties: [
          {
            propertyKey: "estadoCivil",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("datospareja");
    }
  };

  return (
    <>
      <Question
        title="Indica tu estado civil"
        type={QuestionType.Radio}
        options={[
          { label: "Soltero", value: "soltero" },
          { label: "Casado", value: "casado" },
          { label: "Divorciado", value: "divorciado" },
          { label: "Viudo", value: "viudo" },
          { label: "Pareja de hecho", value: "pareja" },
        ]}
        nextStep={nextStep}
      />
    </>
  );
};

export default IndicaEstadoCivil;
