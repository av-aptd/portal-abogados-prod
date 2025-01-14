import React, { useEffect } from "react";
import { usePortalStore } from "store/portal";
import { usePreguntasStore } from "store/preguntas";
import Question from "../question";
import { QuestionType } from "../question";
import { useUIStore } from "store/ui";

const help = [
  `<p>Estos son tus gastos mensuales según el estudio económico que realizaste previamente.</p>
  <p>Revisa si estos son todos los gastos que tienes anualmente. Debes contabilizar cualquier tipo de gasto que debas asumir en tu día a día: alquiler, comida, luz, agua, gas, internet, móvil, seguros, transporte, gasolina, colegio, medicación, ocio, etc.</p>
`,
];

const ConfirmaTusGastosMensuales = () => {
  const answer = usePreguntasStore((state) => state.answer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const profile = usePortalStore((state) => state.profile);
  const answers = usePortalStore((state) => state.answers);
  let q: any;

  const setHelp = useUIStore((state) => state.setHelp);

  useEffect(() => {
    setHelp(help);
  }, []);

  if (answers.length > 0) {
    q = answers?.filter(
      (f: any) => f.questionKey == "cualessontusgastostotales"
    )[0]
      ? answers?.filter(
          (f: any) => f.questionKey == "cualessontusgastostotales"
        )[0].selected
      : "";
  } else {
    q = "";
  }
  const nextStep = () => {
    insertAnswer({
      userId: profile.id,
      groupValue: answer.title,
      groupKey: "confirmatusgastosmensuales",
      groupNextKey: "eligegastosmensuales",
      properties: [
        {
          propertyKey: "gastosMensuales",
          propertyValue: answer.selected,
        },
      ],
    });

    setCurrentQuestion("eligegastosmensuales");
  };

  return (
    <>
      <Question
        title="Confirma tus gastos mensuales"
        initial={q}
        type={QuestionType.TextSymbol}
        symbol="EUROS"
        nextStep={nextStep}
      />
    </>
  );
};

export default ConfirmaTusGastosMensuales;
