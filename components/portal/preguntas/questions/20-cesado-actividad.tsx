import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>Marca <strong>SI</strong> en caso de haber detenido toda actividad comercial, productiva o de prestación de servicio como autónomo.</p>
  <p>Por el contrario, marca <strong>NO</strong> si a día de hoy la empresa sigue estando activa.</p>
`,
];

const HaCesadoSuActividad = () => {
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
    if (answer.selected === "yes") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "hacesadoactividad",
        groupNextKey: "tienesbienesactivos",
        properties: [
          {
            propertyKey: "haCesadoActividad",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("tienesbienesactivos");
    }
    if (answer.selected === "no") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "hacesadoactividad",
        groupNextKey: "tienesbienesactivos",
        properties: [
          {
            propertyKey: "haCesadoActividad",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("tienestrabajadores");
    }
  };

  return (
    <>
      <Question
        title="¿Ha cesado su actividad?"
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

export default HaCesadoSuActividad;
