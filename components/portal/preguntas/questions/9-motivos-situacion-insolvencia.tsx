import React, { useEffect } from "react";
import { usePortalStore } from "store/portal";
import { usePreguntasStore } from "store/preguntas";
import Nav from "../nav";
import Question from "../question";
import { QuestionType } from "../question";
import { useUIStore } from "store/ui";

const help = [
  `<p>Indica qué motivos han sido los que te han llevado a no poder pagar las deudas. Es importante que expliques detalladamente cómo has llegado a tu situación actual, ya que debemos usar esta información para presentar tu expediente al Juzgado y solicitar la cancelación de las deudas.</p>
  <p>En caso de ser un particular, lo más habitual es que sea por desempleo o sobreendeudamiento.</p>
  <p>En caso de ser autónomo o empresario, por problemas de facturación, de gestión de empresas o por ser avalista de una empresa.</p>
`,
];

const MotivosSituacionInsolvencia = () => {
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
    insertAnswer({
      userId: profile.id,
      groupValue: answer.title,
      groupKey: "motivossituacioninsolvencia",
      groupNextKey: "indicaestadocivil",
      properties: [
        {
          propertyKey: "motivosInsolvencia",
          propertyValue: answer.selected,
        },
      ],
    });

    setCurrentQuestion("indicaestadocivil");
  };

  return (
    <>
      <Question
        title="¿Porque has dejado de pagar tus deudas?"
        description="Para qué se pidió el préstamo, diferencias salariales y de gastos de esa fecha a la actual, así como diferencias económicas y sociales ¿por qué ha dejado de pagar realmente? Expláyate para que se admita la demanda."
        type={QuestionType.Text}
        size="large"
        nextStep={nextStep}
      />
    </>
  );
};

export default MotivosSituacionInsolvencia;
