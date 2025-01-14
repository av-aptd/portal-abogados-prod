import React, { useEffect } from "react";
import Direccioncliente from "./1-direccion-cliente";
import TipoInsolvencia from "./10-tipo-insolvencia";
import MotivoInsolvencia from "./11-motivo-insolvencia";
import EstadoCivil from "./12-estado-civil";
import DatosConyuge from "./13-datos-conyuge";
import FechaMatrimonio from "./14-fecha-matrimonio";
import RegimenEconomico from "./15-regimen-economico";
import ExistenMedidasReguladoras from "./16-existen-medidas-reguladoras";
import DatosDNI from "./2-datos-dni";
import CambioEmpadronamiento from "./3-cambio-empadronamiento";
import IngresosMensuales from "./4-ingresos-mensuales";
import TipoIngresos from "./5-tipo-de-ingresos";
import GastosMensuales from "./6-gastos-mensuales";
import TipoGastosMensuales from "./7-tipo-gastos-mensuales";
import TipoActividad from "./8-tipo-actividad";
import ActividadUltimosAnos from "./9-actividad-ultimos-anos";
import PlantillaTrabajadores from "./22-plantilla-trabajadores";
import DatosPareja from "./17-datos-pareja";
import InscritaParejaRegistroCivil from "./18-inscrita-pareja-registro-civil";
import FechaInscripcion from "./19-fecha-inscripcion";
import CuantasPersonasDependenDeTi from "./20-cuantas-personas-dependen-de-ti";
import ListadoPersonasDependientes from "./21-listado-personas-dependientes";
import CopropietariosViviendaHabitual from "./23-copropietarios-vivienda-habitual";
import PersonaFisicaOAutonomo from "./24-autonomo-o-persona-fisica";
import HasCesadoActividad from "./25-has-cesado-actividad";
import TienesTrabajadores from "./26-tienes-trabajadores";
import TienesBienesActivos from "./27-tienes-bienes-activos";
import EresTitularCuentasBancarias from "./29-titulas-cuentas-bancarias";
import NumerosCuentasSaldo from "./30-numeros-cuentas-saldo";
import ListadoBienesActivos from "./28-listado-bienes-activos";
import GastosVivienda from "./6-gastos-vivienda";
import { usePortalStore } from "store/portal";
import CuotasAlDia from "./6-Cuotas-al-dia";

const ClientInfoQuestions = ({ type }: any) => {
  const { clientInfo, setQuestionPresentation } = usePortalStore();

  useEffect(() => {
    setQuestionPresentation(type);
  }, [clientInfo]);

  return (
    <div>
      <TipoActividad clientInfo={clientInfo} />
      <ActividadUltimosAnos clientInfo={clientInfo} />
      <TipoInsolvencia clientInfo={clientInfo} />
      <MotivoInsolvencia clientInfo={clientInfo} />
      <Direccioncliente clientInfo={clientInfo} />
      <DatosDNI clientInfo={clientInfo} />
      <CambioEmpadronamiento clientInfo={clientInfo} />
      <IngresosMensuales clientInfo={clientInfo} />
      <TipoIngresos clientInfo={clientInfo} />
      <GastosVivienda clientInfo={clientInfo} />
      <CuotasAlDia clientInfo={clientInfo} />
      <GastosMensuales clientInfo={clientInfo} />
      <TipoGastosMensuales clientInfo={clientInfo} />
      <EstadoCivil clientInfo={clientInfo} />
      <DatosConyuge clientInfo={clientInfo} />
      <FechaMatrimonio clientInfo={clientInfo} />
      <RegimenEconomico clientInfo={clientInfo} />
      <ExistenMedidasReguladoras clientInfo={clientInfo} />
      <DatosPareja clientInfo={clientInfo} />
      <InscritaParejaRegistroCivil clientInfo={clientInfo} />
      <FechaInscripcion clientInfo={clientInfo} />
      <CuantasPersonasDependenDeTi clientInfo={clientInfo} />
      <ListadoPersonasDependientes clientInfo={clientInfo} />
      <CopropietariosViviendaHabitual clientInfo={clientInfo} />
      <PersonaFisicaOAutonomo clientInfo={clientInfo} />
      <HasCesadoActividad clientInfo={clientInfo} />
      <TienesTrabajadores clientInfo={clientInfo} />
      <PlantillaTrabajadores clientInfo={clientInfo} />
      <TienesBienesActivos clientInfo={clientInfo} />
      <ListadoBienesActivos clientInfo={clientInfo} />
      <EresTitularCuentasBancarias clientInfo={clientInfo} />
      <NumerosCuentasSaldo clientInfo={clientInfo} />
    </div>
  );
};

export default ClientInfoQuestions;
