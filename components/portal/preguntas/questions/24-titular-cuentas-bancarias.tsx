import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { useRouter } from "next/router";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";

const help = [
  `<p>En caso de tener una o varias cuentas bancarias a tu nombre, marca <strong>SI</strong>.</p>
  <p>En caso de no tener ninguna cuenta bancaria a tu nombre, marca <strong>NO</strong>.</p>
`,
];

const EresTitularDeCuentasBancarias = () => {
  const answer = usePreguntasStore((state) => state.answer);
  const addAnswer = usePreguntasStore((state) => state.addAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const profile = usePortalStore((state) => state.profile);
  const setHelp = useUIStore((state) => state.setHelp);

  useEffect(() => {
    setHelp(help);
  }, []);

  const router = useRouter();

  const nextStep = () => {
    if (answer.selected === "yes") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "erestitulardecuentasbancarias",
        groupNextKey: "numeroscuentassaldo",
        properties: [
          {
            propertyKey: "eresTitularDeCuentasBancarias",
            propertyValue: answer.selected,
          },
        ],
      });
      setCurrentQuestion("numeroscuentassaldo");
    }
    if (answer.selected === "no") {
      insertAnswer({
        userId: profile.id,
        groupValue: answer.title,
        groupKey: "erestitulardecuentasbancarias",
        groupNextKey: "completado",
        properties: [
          {
            propertyKey: "eresTitularDeCuentasBancarias",
            propertyValue: answer.selected,
          },
        ],
      });
      router.push("/portal/clientes/preguntas/completado");
    }
  };

  return (
    <>
      <Question
        title="¿Eres titular de cuentas bancarias?"
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

export default EresTitularDeCuentasBancarias;
