import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>Indica si también tu cónyuge es propietario de la vivienda habitual.</p>
`,
];

const CopropietariosViviendaHabitual = () => {
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
      groupKey: "copropietariosviviendahabitual",
      groupNextKey: "hasolicitadoconyugeconcurso",
      properties: [
        {
          propertyKey: "copropietariosViviendaHabitual",
          propertyValue: answer.selected,
        },
      ],
    });

    setCurrentQuestion("hasolicitadoconyugeconcurso");
  };

  return (
    <>
      <Question
        title="¿Son copropietarios de la vivienda habitual?"
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

export default CopropietariosViviendaHabitual;
