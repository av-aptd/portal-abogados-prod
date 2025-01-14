import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import { usePortalStore } from "store/portal";
import Nav from "../nav";
import Question from "../question";
import { QuestionType } from "../question";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>Estos son tus ingresos mensuales según el estudio económico que realizaste previamente.</p>
  <p>Revisa si estos son todos los ingresos que recibes anualmente. Debes contabilizar cualquier tipo de ingreso: nómina, factura, renta, pensión, prestación, etc.</p>
`,
];

const ConfirmaTusIngresosMensuales = () => {
  const answer = usePreguntasStore((state) => state.answer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const profile = usePortalStore((state) => state.profile);
  const answers = usePortalStore((state) => state.answers);

  const setHelp = useUIStore((state) => state.setHelp);

  useEffect(() => {
    setHelp(help);
  }, []);

  let q: any;

  if (answers.length > 0) {
    q = answers?.filter(
      (f: any) => f.questionKey == "cualessontusingresoslostutupareja"
    )[0]
      ? answers?.filter(
          (f: any) => f.questionKey == "cualessontusingresoslostutupareja"
        )[0].selected
      : "";
  } else {
    q = "";
  }

  const nextStep = () => {
    insertAnswer({
      userId: profile.id,
      groupValue: answer.title,
      groupKey: "confirmatusingresosmensuales",
      groupNextKey: "eligetipoingreso",
      properties: [
        {
          propertyKey: "ingresosMensuales",
          propertyValue: answer.selected,
        },
      ],
    });
    setCurrentQuestion("eligetipoingreso");
  };

  return (
    <>
      <Question
        title="Confirma tus ingresos mensuales"
        initial={q}
        type={QuestionType.TextSymbol}
        symbol="EUROS"
        nextStep={nextStep}
      />
    </>
  );
};

export default ConfirmaTusIngresosMensuales;
