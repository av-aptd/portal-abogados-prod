import React from "react";
import LeadDatosIniciales from "./1-datos-iniciales";
import LeadTienesEstudios from "./10-tienes_estudios";
import LeadImporteGlobalDeudas from "./11-importe-global-de-las-deudas";
import LeadCompartesTusDeudas from "./12-compartes-las-deudas";
import LeadIngresosPareja from "./13-cuales-son-tus-ingresos-los-de-tu-pareja";
import LeadCuantasPersonas from "./14-cuantas-personas-dependen";
import LeadHipotecaOAlquiler from "./15-tienes-hipoteca-o-alquiler";
import LeadCuantoPagasAlquiler from "./16-cuanto-pagas-de-alquiler";
import LeadCuantoPagasHipoteca from "./17-cuanto-pagas-de-hipoteca";
import LeadCuantoTeFaltaPorPagar from "./18-cuanto-te-falta-por-pagar";
import LeadGastosTotales from "./19-gastos-totales";
import Leadtienes2MasDeudas from "./2-tienes-2-mas-deudas";
import LeadCuantoPagasDeCuotas from "./20-cuanto-pagas-de-cuotas";
import LeadCuantoValeVivienda from "./21-cuanto-vale-la-vivienda-hipotecada";
import LeadTienesOtrosBienes from "./22-tienes-otros-bienes-activos";
import LeadValorOtrosBienes from "./23-valor-otros-bienes";
import LeadCorrienteDePagos from "./3-estas-al-corriente-de-pagos";
import LeadPodrasPagarlas from "./4-podras-pagarlas";
import LeadDesdeCuandoNoPagas from "./5-desde-cuando-no-pagas";
import LeadDestinoGastos from "./6-destino-gastos";
import LeadTienesAntecedentes from "./7-tienes-antecedentes-penales";
import LeadHasCumplidoLaPena from "./8-has-cumplido-la-pena";
import LeadTienesInfracciones from "./9-tienes-infracciones";
import LeadCuotasHipotecaAlDia from "./19b-cuotas-hipoteca-al-dia";

const LeadInfoQuestions = (questions: any) => {
  return (
    <div>
      <LeadDatosIniciales questions={questions} />
      <Leadtienes2MasDeudas questions={questions} />
      <LeadCorrienteDePagos questions={questions} />
      <LeadPodrasPagarlas questions={questions} />
      <LeadDesdeCuandoNoPagas questions={questions} />
      <LeadDestinoGastos questions={questions} />
      <LeadTienesAntecedentes questions={questions} />
      <LeadHasCumplidoLaPena questions={questions} />
      <LeadTienesInfracciones questions={questions} />
      <LeadTienesEstudios questions={questions} />
      <LeadImporteGlobalDeudas questions={questions} />
      <LeadCompartesTusDeudas questions={questions} />
      <LeadIngresosPareja questions={questions} />
      <LeadCuantasPersonas questions={questions} />
      <LeadHipotecaOAlquiler questions={questions} />
      <LeadCuantoPagasAlquiler questions={questions} />
      <LeadCuantoPagasHipoteca questions={questions} />
      <LeadCuantoTeFaltaPorPagar questions={questions} />
      <LeadCuotasHipotecaAlDia questions={questions} />
      <LeadGastosTotales questions={questions} />
      <LeadCuantoPagasDeCuotas questions={questions} />
      <LeadCuantoValeVivienda questions={questions} />
      <LeadTienesOtrosBienes questions={questions} />
      <LeadValorOtrosBienes questions={questions} />
    </div>
  );
};

export default LeadInfoQuestions;
