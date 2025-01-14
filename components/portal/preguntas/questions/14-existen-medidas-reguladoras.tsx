import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>Marca <strong>SI</strong> en caso de haberte divorciado a efectos legales mediante una sentencia de divorcio o un convenio regulador.</p>
  <p>Marca <strong>NO</strong> si no llevasteis a cabo ninguna medida reguladora a la hora de divorciaros.</p>
`,
];

const ExistenMedidasReguladoras = () => {
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
      groupKey: "existenmedidasreguladoras",
      groupNextKey: "copropietariosviviendahabitual",
      properties: [
        {
          propertyKey: "existenMedidasReguladoras",
          propertyValue: answer.selected,
        },
      ],
    });

    setCurrentQuestion("copropietariosviviendahabitual");
  };

  return (
    <>
      <Question
        title="¿Existen medidas reguladoras económicas(convenio, sentencia)?"
        description="Convenio, sentencia, etc..."
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

export default ExistenMedidasReguladoras;
