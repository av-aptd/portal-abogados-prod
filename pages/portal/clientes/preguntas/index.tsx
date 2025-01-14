import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";

import Head from "next/head";
import { usePreguntasStore } from "store/preguntas";
import DatosResidencia from "components/portal/preguntas/questions/0-datos-residencia";
import DatosDni from "components/portal/preguntas/questions/1-datos-dni";
import HasCambiadoDeEmpadronamiento from "components/portal/preguntas/questions/2-has-cambiado-empadronamiento";
import ConfirmaTusIngresosMensuales from "components/portal/preguntas/questions/3-confirma-ingresos-mensuales";
import EligeTipoIngreso from "components/portal/preguntas/questions/4-elige-tipo-ingreso";
import ConfirmaTusGastosMensuales from "components/portal/preguntas/questions/5-confirma-gastos-mensuales";
import EligeGastosMensuales from "components/portal/preguntas/questions/6-elige-gastos-mensuales";
import CualEsTuActividad from "components/portal/preguntas/questions/7-cual-es-tu-actividad";
import CualHaSidoTuActividadUltimos from "components/portal/preguntas/questions/8-actividad-los-ultimos-3";
import ConfirmaSituacionInsolvencia from "components/portal/preguntas/questions/8-confirma-situacion-insolvencia";
import MotivosSituacionInsolvencia from "components/portal/preguntas/questions/9-motivos-situacion-insolvencia";
import IndicaEstadoCivil from "components/portal/preguntas/questions/10-indica-estado-civil";
import DatosConyuge from "components/portal/preguntas/questions/11-datos-conyuge";
import FechaMatrimonio from "components/portal/preguntas/questions/12-fecha-matrimonio";
import RegimenEconomico from "components/portal/preguntas/questions/13-regimen-economico";
import ExistenMedidasReguladoras from "components/portal/preguntas/questions/14-existen-medidas-reguladoras";
import DatosPareja from "components/portal/preguntas/questions/15-datos-pareja";
import InscritaParejaRegistroCivil from "components/portal/preguntas/questions/16-inscrita-pareja-registro-civil";
import FechaInscripcion from "components/portal/preguntas/questions/17-fecha-inscripcion";
import CuantasPersonasDependenDeTi from "components/portal/preguntas/questions/19-cuantas-personas-dependen";
import ListadoPersonasDependientes from "components/portal/preguntas/questions/19-listado-personas-dependientes";
import CopropietariosViviendaHabitual from "components/portal/preguntas/questions/18-copropietarios-vivienda-habitual";
import HaSolicitadoConyugeConcurso from "components/portal/preguntas/questions/19-solicitado-conyuge-concurso";
import AutonomoOPersonaFisica from "components/portal/preguntas/questions/19-autonomo-o-persona-fisica";
import HaCesadoSuActividad from "components/portal/preguntas/questions/20-cesado-actividad";
import TienesTrabajadores from "components/portal/preguntas/questions/21-tienes-trabajadores";
import PlantillaTrabajadores from "components/portal/preguntas/questions/22-plantilla-trabajadores";
import TienesBienesActivos from "components/portal/preguntas/questions/23-tienes-bienes-activos";
import EresTitularDeCuentasBancarias from "components/portal/preguntas/questions/24-titular-cuentas-bancarias";
import NumerosCuentasSaldo from "components/portal/preguntas/questions/25-numeros-cuentas-saldo";
import EligeActivosQuePosees from "components/portal/preguntas/questions/26-elige-los-activos-que-posees";
import ConfirmaGastosVivienda from "components/portal/preguntas/questions/5-confirma-gastos-vivienda";

import { usePortalStore } from "store/portal";
import { getLeadEstudioEconomico } from "apis/client";
import HelpSlideOver from "components/portal/helpSlideOver";

interface IQuestion {
  questionKey: string;
  component: any;
}

const Preguntas: NextPageWithLayout = () => {
  const questions: IQuestion[] = [];
  const currentQuestion = usePreguntasStore((state) => state.currentQuestion);
  const setAnswers = usePortalStore((state) => state.setAnswers);
  const setLead = usePortalStore((state) => state.setLead);
  const setType = usePortalStore((state) => state.setType);
  const profile = usePortalStore((state) => state.profile);

  questions.push({
    questionKey: "datosresidencia",
    component: DatosResidencia,
  });
  questions.push({
    questionKey: "datosdni",
    component: DatosDni,
  });
  questions.push({
    questionKey: "hascambiadodeempadronamiento",
    component: HasCambiadoDeEmpadronamiento,
  });
  questions.push({
    questionKey: "confirmatusingresosmensuales",
    component: ConfirmaTusIngresosMensuales,
  });
  questions.push({
    questionKey: "eligetipoingreso",
    component: EligeTipoIngreso,
  });

  questions.push({
    questionKey: "confirmagastosvivienda",
    component: ConfirmaGastosVivienda,
  });

  questions.push({
    questionKey: "confirmatusgastosmensuales",
    component: ConfirmaTusGastosMensuales,
  });
  questions.push({
    questionKey: "eligegastosmensuales",
    component: EligeGastosMensuales,
  });
  questions.push({
    questionKey: "cualestuactividad",
    component: CualEsTuActividad,
  });
  questions.push({
    questionKey: "actividadlosultimos3",
    component: CualHaSidoTuActividadUltimos,
  });
  questions.push({
    questionKey: "confirmasituacioninsolvencia",
    component: ConfirmaSituacionInsolvencia,
  });
  questions.push({
    questionKey: "motivossituacioninsolvencia",
    component: MotivosSituacionInsolvencia,
  });
  questions.push({
    questionKey: "indicaestadocivil",
    component: IndicaEstadoCivil,
  });
  questions.push({
    questionKey: "datosconyuge",
    component: DatosConyuge,
  });
  questions.push({
    questionKey: "fechamatrimonio",
    component: FechaMatrimonio,
  });
  questions.push({
    questionKey: "regimeneconomico",
    component: RegimenEconomico,
  });
  questions.push({
    questionKey: "existenmedidasreguladoras",
    component: ExistenMedidasReguladoras,
  });
  questions.push({
    questionKey: "datospareja",
    component: DatosPareja,
  });
  questions.push({
    questionKey: "inscritaparejaregistrocivil",
    component: InscritaParejaRegistroCivil,
  });
  questions.push({
    questionKey: "fechainscripcion",
    component: FechaInscripcion,
  });
  questions.push({
    questionKey: "cuantaspersonasdependendeti",
    component: CuantasPersonasDependenDeTi,
  });
  questions.push({
    questionKey: "listadopersonasdependientes",
    component: ListadoPersonasDependientes,
  });
  questions.push({
    questionKey: "copropietariosviviendahabitual",
    component: CopropietariosViviendaHabitual,
  });
  questions.push({
    questionKey: "hasolicitadoconyugeconcurso",
    component: HaSolicitadoConyugeConcurso,
  });

  questions.push({
    questionKey: "autonomoopersonafisica",
    component: AutonomoOPersonaFisica,
  });

  questions.push({
    questionKey: "hacesadoactividad",
    component: HaCesadoSuActividad,
  });

  questions.push({
    questionKey: "tienestrabajadores",
    component: TienesTrabajadores,
  });

  questions.push({
    questionKey: "plantillatrabajadores",
    component: PlantillaTrabajadores,
  });

  questions.push({
    questionKey: "tienesbienesactivos",
    component: TienesBienesActivos,
  });

  questions.push({
    questionKey: "erestitulardetcuentasbancarias",
    component: EresTitularDeCuentasBancarias,
  });

  questions.push({
    questionKey: "numeroscuentassaldo",
    component: NumerosCuentasSaldo,
  });

  questions.push({
    questionKey: "eligeactivosqueposees",
    component: EligeActivosQuePosees,
  });

  const getQuestion = (question: string) => {
    const TagName = questions.find(
      (q) => q.questionKey === question
    )?.component;
    return <TagName />;
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    let leadData: any = {};
    const response = await getLeadEstudioEconomico(profile.email);

    console.log("response:", response);

    if (response.status === 200) {
      leadData = await response.json();

      setLead(leadData.lead);
      setType(leadData.type);
      setAnswers(leadData.answers);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Preguntas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="mx-auto max-w-5xl py-10">
        {getQuestion(currentQuestion)}
      </div>
    </>
  );
};

Preguntas.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Preguntas;
