import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `<p>Marca <strong>AUTÓNOMO</strong> solo si actualmente estás dado de alta como autónomo en la Seguridad Social y Hacienda.</p>
  <p>Marca <strong>PERSONA FÍSICA</strong> si eres un particular, ya estés trabajando, en el paro, desempleado, jubilado, cobrando una prestación, etc.</p>
`,
];

const AutonomoOPersonaFisica = () => {
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
    if (answer.selected === "autonomo") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "autonomoopersonafisica",
        groupNextKey: "hacesadoactividad",
        properties: [
          {
            propertyKey: "tipoCliente",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("hacesadoactividad");
    }
    if (answer.selected === "persona") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "autonomoopersonafisica",
        groupNextKey: "tienesbienesactivos",
        properties: [
          {
            propertyKey: "tipoCliente",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("tienesbienesactivos");
    }
  };

  return (
    <>
      <Question
        title="¿Actualmente eres autónomo o persona física no empresaria?"
        type={QuestionType.Buttons}
        options={[
          { label: "Autónomo", value: "autonomo" },
          { label: "Persona física no empresaria", value: "persona" },
        ]}
        nextStep={nextStep}
      />
    </>
  );
};

export default AutonomoOPersonaFisica;
