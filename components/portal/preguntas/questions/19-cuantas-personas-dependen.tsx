import React, { useEffect } from "react";
import { usePortalStore } from "store/portal";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>Indica cuántas personas dependen de ti rellenando la información solicitada.</p>
  <p>Son personas a tu cargo: hijos menores de edad, hijos mayores de edad que viven en casa y tienes que mantener, personas mayores o con discapacidad bajo tu supervisión, etc.</p>
  <p>Rellena los datos también si estás divorciado y tienes que pasar una pensión por alimentos o pensión compensatoria.</p>
`,
];

const CuantasPersonasDependenDeTi = () => {
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
    if (answer.selected === "ninguna") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "cuantaspersonasdependendeti",
        groupNextKey: "copropietariosviviendahabitual",
        properties: [
          {
            propertyKey: "personasDependientes",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("copropietariosviviendahabitual");
    }
    if (answer.selected === "1omas") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "cuantaspersonasdependendeti",
        groupNextKey: "listadopersonasdependientes",
        properties: [
          {
            propertyKey: "personasDependientes",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("listadopersonasdependientes");
    }
  };

  return (
    <>
      <Question
        title="¿Cuántas personas dependen económicamente de ti?"
        type={QuestionType.Radio}
        options={[
          { label: "Ninguna", value: "ninguna" },
          { label: "1 o más", value: "1omas" },
        ]}
        nextStep={nextStep}
      />
    </>
  );
};

export default CuantasPersonasDependenDeTi;
