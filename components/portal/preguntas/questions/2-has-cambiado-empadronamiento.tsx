import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>El empadronamiento es el documento que firmas en el ayuntamiento para registrar la dirección de tu domicilio.</p>
  <p>Si has cambiado de empadronamiento en los últimos 6 meses, marca <strong>SI.</strong></p>
  <p>Por el contrario, si no has cambiado de empadronamiento en los últimos 6 meses, marca <strong>NO.</strong></p> 
  <p>Si has cambiado de domicilio en los últimos 6 meses pero no has cambiado de empadronamiento en el ayuntamiento, marca <strong>NO.</strong></p>
`,
];

const HasCambiadoDeEmpadronamiento = () => {
  const answer = usePreguntasStore((state) => state.answer);
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const profile = usePortalStore((state) => state.profile);
  const setHelp = useUIStore((state) => state.setHelp);

  useEffect(() => {
    setHelp(help);
  }, []);

  const nextStep = () => {
    insertAnswer({
      userId: profile.id,
      groupValue: answer.title,
      groupKey: "hascambiadodeempadronamiento",
      groupNextKey: "confirmatusingresosmensuales",
      properties: [
        {
          propertyKey: "cambioEmprarodamiento6meses",
          propertyValue: answer.selected,
        },
      ],
    });
    setCurrentQuestion("confirmatusingresosmensuales");
  };

  return (
    <>
      <Question
        title="¿Has cambiado de empadronamiento en los últimos 6 meses?"
        type={QuestionType.Buttons}
        options={[
          { label: "Sí", value: "yes" },
          { label: "No", value: "no" },
        ]}
        nextStep={nextStep}
      />
    </>
  );
};

export default HasCambiadoDeEmpadronamiento;
