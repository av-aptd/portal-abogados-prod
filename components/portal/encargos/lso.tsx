import React, { useEffect, useState } from "react";
import { useEstudioStore } from "store/estudio";
import { formatDate } from "shared/helpers";
import { bankAccouts } from "vars/shared";

const EncargoLSO = () => {
  const lead = useEstudioStore((state) => state.lead);
  const planId = useEstudioStore((state) => state.planId);
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getPlan();
  }, []);

  const getPlan = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/pricing/${planId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setPlan(await res.json());
    setLoading(false);
  };

  const fecha = new Date();

  if (isLoading) return null;

  return (
    <div className="prose max-w-none">
      <h1 className="text-center font-bold text-lg mb-8 text-gray-700">
        HOJA DE ENCARGO PROFESIONAL - PROCEDIMIENTO CONCURSAL DE PERSONA FÍSICA.
      </h1>
      <div className="mx-auto max-w-4xl text-gray-500 bg-white p-8 rounded-lg border mb-8">
        <p>
          En Barcelona, a <strong>{formatDate(fecha, "medium", "es")}</strong>.
        </p>
        <h3>REUNIDOS</h3>
        <p>
          De una parte, D. <strong>{lead.name + " " + lead.surname}</strong>,
          mayor de edad, con DNI/NIE/Pasaporte <strong>{lead.dni}</strong>,
          e-mail <strong>{lead.email}</strong> y teléfono{" "}
          <strong>{lead.phone}</strong>, actuando en su nombre propio y derecho
          (en adelante el <strong>CLIENTE</strong>).
        </p>
        <p>
          De otra parte, D. CRISTIAN TANASE, mayor de edad, actuando en nombre y
          representación de la mercantil CORMEUM GLOBAL S.L. (comercialmente
          conocido como ABOGADOS PARA TUS DEUDAS), mercantil domiciliada en
          08008-Barcelona, Calle Rosselló 216, Planta 11 y provista de CIF
          B67209791 e inscrita en el Registro Mercantil de Barcelona (en
          adelante, <strong>APTD</strong>).
        </p>
        <p>
          Así mismo, EL CLIENTE autoriza a CORMEUM GLOBAL SL a realizar el apud
          acta a favor de Victoria Arias Cortés con NIF 73159906B, colegiada 407
          del Ilustre Colegio de Procuradores de Zaragoza.
        </p>
        <p>
          Cada una de las partes podrá ser denominada individualmente o
          conjuntamente como “La Parte” o “Las Partes”.
        </p>
        <p>
          Ambas Partes se reconocen mutuamente su capacidad para otorgar el
          presente documento, y, en su conformidad <strong>EXPONEN:</strong>
        </p>
        <ol type="I">
          <li>
            APTD es una firma legal especializada en la intermediación y
            negociación de deudas con entidades financieras y todo tipo de
            acreedores comerciales, que cuenta con Abogados expertos en derecho
            bancario y concursal
          </li>
          <li>
            El CLIENTE, previa información por parte de APTD, ha expresado que
            se encuentra en una situación de insolvencia (situación dificultosa
            que le impide cumplir con sus obligaciones presentes y/o futuras), y
            está interesado en la contratación de servicios jurídicos que le
            permitan iniciar un procedimiento concursal de persona física,
            comúnmente conocida como Ley de la Segunda Oportunidad.
          </li>
          <li>
            Que El CLIENTE y APTD han alcanzado un acuerdo en virtud del cual
            APTD instará el procedimiento concursal en beneficio e interés del
            cliente, mediante los letrados a los que APTD encomiende su defensa,
            y/o aquellos colaboradores jurídicos externos que la mercantil
            designe, llegado el caso, otorgando el presente CONTRATO DE
            ARRENDAMIENTO DE SERVICIOS, y de conformidad con las normas de
            deontología profesional que regulan el ejercicio de la Abogacía,
            todo ello con arreglo a las siguientes
          </li>
        </ol>
        <h2>ESTIPULACIONES</h2>
        <h3>PRIMERA.- Objeto del contrato</h3>
        <h4>1.1. Actuaciones judiciales:</h4>
        <p>
          El presente acuerdo tiene por objeto la prestación de Servicios
          Profesionales de dirección letrada y defensa en el marco del concurso
          de acreedores de persona física, no implicando, en consecuencia,
          vínculo laboral alguno.
        </p>
        <p>El servicio contratado incluye: </p>
        <ul>
          <li>
            Acompañamiento para avanzar en la recopilación de documentación a
            través del Portal de Clientes de APTD, que servirá para remitir
            documentación y como canal principal de comunicación con el Abogado.
          </li>
          <li>
            Interposición de solicitud judicial de concurso, y tramitación o
            personación en el procedimiento con la finalidad de alcanzar un plan
            de pagos o la exoneración de las deudas una vez haya entregado EL
            CLIENTE toda la documentación obligatoria solicitada y ésta sea
            suficiente para su presentación, tras el primer pago fraccionado de
            los honorarios acordados.
          </li>
          <li>
            Para llevar a cabo la prestación de los Servicios será de necesaria
            intervención contar con un Procurador. Este interviniente es
            obligatorio y necesario por Ley, y ostenta la representación del
            CLIENTE ante los Tribunales.
          </li>
        </ul>
        <p>
          Las partes acuerdan que estos servicios se desarrollarán durante el
          tiempo necesario para lograr el objetivo establecido y mientras sea
          posible alcanzar la conclusión el concurso por insuficiencia de masa
          activa judicial, y, por tanto, se entenderán finalizados cuando no sea
          posible avanzar en este proceso, ya sea por haber alcanzado un acuerdo
          con los acreedores, por resultar éste imposible, o por haber
          finalizado el procedimiento judicial de concurso consecutivo, o
          resultar imposible su continuación ya sea por el incumplimiento de los
          requisitos o por cualquier otra circunstancia.
        </p>
        <h4>1.2. Limitaciones a la prestación del servicio: </h4>
        <ol type="A">
          <li>
            APTD en ningún caso garantiza el resultado del procedimiento
            concursal, así como tampoco la exoneración de las deudas (esto es el
            perdón de las deudas), ni total, ni parcialmente.
          </li>
          <li>
            No se incluye la tramitación de ningún otro procedimiento que no sea
            el proceso concursal, que deberán tarificarse y abonarse
            separadamente. A modo enunciativo pero no limitativo: Procedimientos
            Monitorios, Verbales, Ordinarios, Ejecutivos, Laborales,
            Administrativos o Penales.
          </li>
          <li>
            Asimismo, los honorarios de otros participantes en el procedimiento
            concursal no se encuentran incluidos. A modo enunciativo por sin
            limitarse a ellos: Procurador, Notario, o Administrador Concursal.
          </li>
        </ol>
        <h4>
          1.3. Agilidad de procesos, acceso de los clientes a los expedientes y
          portal de clientes.
        </h4>
        <p>
          APTD ha diseñado un sistema de gestión de procesos (Portal de
          Clientes) que permite agilizar los trámites y reducir los costes para
          el cliente. Por ello se promoverá el que EL CLIENTE pueda consultar
          telemáticamente su expediente para que en cualquier momento pueda
          estar informado de su situación y avance.
        </p>
        <h4>1.4. Transparencia. Información y documentación.</h4>
        <p>
          El CLIENTE se obliga a adjuntar a través del Portal de Clientes toda
          la documentación e información que posea del caso en concreto a fin de
          facilitar en lo posible el estudio y tramitación del asunto.
          Igualmente, otorgará, si así es requerido por APTD, a la mayor
          brevedad posible, autorización o poder notarial a favor de las
          personas que éste designe, a fin de que puedan actuar en cuantos
          asuntos sean necesarios en su representación dentro del mismo
          procedimiento concursal, sin que en dicha actuación puedan firmar
          acuerdos de refinanciación sin el consentimiento expreso y por escrito
          del CLIENTE.
        </p>
        <p>
          Asimismo, EL CLIENTE reconoce que{" "}
          <span className="underline">ha sido informado por parte de APTD</span>{" "}
          de la necesidad de informar de todos los bienes y derechos que sean de
          su titularidad y estén dentro de su patrimonio en el momento de
          suscripción del presente contrato, como por ejemplo local social,
          vehículos, contrato de alquiler, etc., y de que existe la posibilidad
          de ejercitarse acciones de reintegración, en caso que algunos bienes
          integrantes de su patrimonio anteriormente, hayan salido del mismo con
          la intención de excluirlos del presente proceso. Asimismo, El CLIENTE
          reconoce haber sido informado y acepta la posibilidad de subasta o
          liquidación de los bienes que sean de su propiedad en el mismo
          proceso.
        </p>
        <p>
          Asimismo, EL CLIENTE{" "}
          <span className="underline">
            reconoce haber sido informado y acepta
          </span>{" "}
          la posibilidad de subasta o liquidación de los bienes que sean de su
          propiedad en el mismo proceso.
        </p>
        <h3>SEGUNDA.- Precio y forma de pago</h3>
        <p>
          Los honorarios profesionales a satisfacer por el CLIENTE para la
          tramitación del procedimiento concursal de persona jurídica se fijan
          según cuantía y forma de pago Anexo número 1 al presente documento.
        </p>

        <h3>
          TERCERA.- Desistimiento del contrato conforme a la Ley de Consumidores
          y Usuarios.
        </h3>
        <p>
          Tras la contratación, EL CLIENTE podrá cancelar y desistir de la misma
          en un plazo de 14 días naturales, con o sin causa justificada, y sin
          ningún tipo de penalización, siempre y cuando el servicio no se
          hubiera prestado ya por APTD.
        </p>
        <p>
          El desistimiento podrá ser comunicado por cualquier medio que deje
          constancia de su recepción, y APTD tendrá derecho a hacer suyas o
          reclamar los gastos que se hayan producido durante este periodo.
        </p>
        <h3>CUARTA.- Finalización anticipada del encargo profesional.</h3>
        <p>
          Transcurridos los 14 días indicados en la estipulación tercera, EL
          CLIENTE, en cualquier momento del proceso, puede ejercitar su derecho
          a desistir libremente del presente contrato, si bien estará obligado a
          abonar los honorarios incurridos según las siguientes fases:
        </p>
        <ol>
          <li>El 50% de los honorarios si éstos no se hubieren devengado.</li>
          <li>
            Aquellos honorarios pendientes según la mensualidad en la que se
            encuentren.
          </li>
          <li>
            En aquellos supuestos en los que se haya solicitado la conclusión
            del concurso por insuficiencia de masa activa, el 100% de los
            honorarios.
          </li>
          <li>
            En aquellos supuestos en los que se haya solicitado la exoneración
            de las deudas, el 100% de los honorarios.
          </li>
        </ol>
        <p>
          En caso de incumplimiento de los términos de pago por parte del
          CLIENTE, APTD podrá interrumpir la tramitación de expediente, e
          incluso desistir del contrato, y renunciar a la defensa letrada del
          procedimiento judicial una vez iniciado, haciendo suyas las cantidades
          cobradas en concepto de honorarios.
        </p>
        <p>
          Las cuotas de los honorarios no vencidas y no pagadas, se comunicarán
          como créditos contra la masa por lo que serán comunicados por APTD al
          Administrador Concursal y/o al Juzgado designado para el concurso de
          acreedores del cliente que firma la presente hoja de encargo.
        </p>
        <p>
          El CLIENTE tiene la obligación de comunicar de forma inmediata a APTD
          el nombramiento de Administrador Concursal por el Juzgado, con el fin
          de poder cumplir todos los plazos legales. La falta de comunicación
          inmediata supondrá el incumplimiento del contrato por parte del
          cliente.
        </p>
        <h3>QUINTA.- Devolución de cuotas.</h3>
        <p>
          Se prevé expresamente que las concurrencias de las siguientes
          circunstancias son causa de la no devolución de las cantidades
          abonadas en concepto de honorarios:
        </p>
        <ol type="a">
          <li>
            Mala intención por parte del cliente que le inhabilite para la
            conclusión el concurso por falta de masa activa, plan de pagos o
            convenio: Falsedad documental, incorrección de datos facilitados,
            mala fe, ocultación de información, alzamiento de bienes, ocultación
            de activos, utilización de crédito durante el procedimiento, entre
            otros.
          </li>
          <li>
            Falta de diligencia por parte del cliente que impide el desarrollo
            del procedimiento: falta de entrega de la documentación requerida,
            falta de atención a los requerimientos, falta de comunicación con la
            empresa, falta de atención a las llamadas telefónicas o correos,
            entre otros.
          </li>
          <li>
            No admisión a trámite de la demanda de concurso consecutivo por
            cuestiones imputables al cliente.
          </li>
          <li>
            Desacuerdo por parte del cliente con terceros actores del proceso
            que impidan finalizar el proceso.
          </li>
          <li>
            Incumplimiento de las excepciones legales que no permitan la
            finalización del encargo profesional como era de esperar.
          </li>
        </ol>
        <h3>SEXTA.- Gastos de otros profesionales.</h3>
        <p>
          El cliente reconoce haber sido informado por APTD acerca de la
          intervención de otros profesionales y organismos en este proceso y de
          sus funciones, tales como administradores concursales, procuradores,
          peritos, Registros y cualquier otro que se produzca que a lo largo del
          presente proceso, los cuales llevan aparejados sus correspondientes
          costes económicos derivados de su intervención, y cuyo pago puede ser
          necesario para la continuación del expediente y la obtención de la
          exoneración, sin perjuicio que aquellos profesionales liberales puedan
          facilitar . Estos costes y gastos no están incluidos en los honorarios
          pactados en el punto anterior.
        </p>
        <p>
          APTD aceptará aquellos profesionales que el CLIENTE designe
          libremente, no siendo preceptiva la intervención de aquellos con los
          que pudiere mantener alguna relación de colaboración más allá de la
          representación del cliente, no percibiendo remuneración alguna de
          éstos.
        </p>
        <p>
          En caso de que el proceso se lleve a cabo como unidad familiar, los
          costes de los profesionales que intervienen pueden ser mayores, al
          aumentar los miembros que se acogen a dicho proceso.
        </p>
        <p>
          Asimismo, el CLIENTE manifiesta que ha sido informado por parte de
          ABOGADOS PARA TUS DEUDAS que, entre otros requisitos, deberá demostrar
          que tiene capacidad económica suficiente para poder hacer frente a los
          créditos contra la masa y determinados créditos públicos como
          requisito indispensable.
        </p>
        <h3>SÉPTIMA.- Terminación y resolución del contrato.</h3>
        <p>
          Son causas de terminación y resolución del contrato las siguientes:
        </p>
        <ol type="a">
          <li>
            Su terminación normal, ya sea por haberse cumplido la prestación o
            por acuerdo de las partes. Se entiende que APTD ha finalizado la
            prestación una vez que se ha alcanzado convenio, exoneración o plan
            de pagos en fase judicial, así como la resolución que pone fin a la
            vía judicial en primera instancia.
          </li>
          <li>
            Por incumplimiento de las partes de alguna de las cláusulas del
            presente contrato sin que este incumplimiento hubiera sido subsanado
            dentro de los cinco días siguientes a la notificación efectuada por
            la otra parte solicitando su subsanación.
          </li>
          <li>
            Por incumplimiento de los requisitos para la admisión de la demanda
            de concurso por parte de EL CLIENTE.
          </li>
        </ol>
        <h3>OCTAVA.- Notificaciones.</h3>
        <p>
          El cliente acepta y ratifica con la firma del presente documento que
          cualquier notificación / comunicación emitida por ABOGADOS PARA TUS
          DEUDAS al correo electrónico facilitado, a la dirección postal o al
          teléfono señalado anteriormente, se considera válido a plenos efectos
          legales. La ausencia de respuesta por parte del cliente no derivará en
          responsabilidad alguna para ABOGADOS PARA TUS DEUDAS.
        </p>
        <h3>NOVENA.- Protección de Datos.</h3>
        <ol type="a">
          <li>
            El CLIENTE autoriza expresamente a APTD a la inclusión en sus
            ficheros y tratamiento de todos los datos de carácter personal que
            le fueran facilitados para el mantenimiento de la futura relación
            contractual, la elaboración de estudios estadísticos y, en su caso,
            el envío de información comercial.
          </li>
          <li>
            Dichos datos permanecerán en los ficheros de la mercantil y estarán
            sujetos mediante solicitud escrita del interesado, a los derechos de
            acceso, rectificación, cancelación, oposición, portabilidad, olvido
            y limitación del tratamiento de sus datos de acuerdo con la
            legislación vigente, mediante el envío de e-mail al correo:
            legal@abogadosparatusdeudas.es.
          </li>
          <li>
            Mediante la firma de la presente hoja de encargo el cliente autoriza
            expresamente a APTD a la cesión de los datos facilitados de carácter
            personal a terceros o colaboradores que intervienen en el proceso
            anexo a los servicios contratados.
          </li>
          <li>
            En dicho caso, se realizará la misma con la única finalidad de la
            continuación en la prestación de servicios profesionales requeridos
            por EL CLIENTE, en favor de cualquier otra entidad que APTD
            considere oportuno.
          </li>
          <li>
            El cliente, autoriza a APTD, para que pueda comunicar al cotitular
            del presente contrato, datos personales e informar y notificar del
            estado y requerimientos relacionados con el procedimiento de Segunda
            Oportunidad, al que el cliente se encuentra acogido. Cualquier
            comunicación realizada al autorizado/a, será considerada como
            notificación al cliente, asumiendo el/la autorizado/a, la obligación
            de comunicarlo en el plazo más breve posible, bajo su propia
            responsabilidad. Se pone en conocimiento del cliente, que para
            revocar la anterior autorización, será necesario remitir escrito de
            cancelación, firmado, por correo certificado a la dirección de
            CORMEUM GLOBAL S.L, domiciliada en Carrer de Rosselló 216, Planta
            11, 08008, Barcelona.
          </li>
        </ol>
        <h3>DÉCIMA.- Jurisdicción competente.</h3>
        <p>
          Las partes acuerdan someterse, para la resolución de cualquier
          divergencia que pudiera existir tanto en la interpretación, aplicación
          o ejecución del presente contrato, a la jurisdicción de los Juzgados y
          Tribunales de Barcelona, con renuncia expresa a su propio fuero en
          caso de ser distinto.
        </p>
        <p>
          Y, de conformidad por ambas partes, suscriben la presente hoja de
          encargo profesional mediante firma electrónica, en la fecha y lugar
          indicados en el encabezamiento del presente documento.
        </p>
      </div>
      <div className="mx-auto max-w-4xl text-gray-500 bg-white p-8 rounded-lg border">
        <h3>ANEXO I. A LA HOJA DE ENCARGO PROFESIONAL</h3>
        <p>
          El precio del servicio por los honorarios de APTD se fija en la
          cantidad de{" "}
          <strong>{plan?.amount.toLocaleString("es-AR")} euros</strong>. De este
          modo, el precio total del servicio queda desglosado como sigue:
        </p>
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 my-0">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Concepto
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Importe
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                      Total Honorarios APTD
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {plan?.amount.toLocaleString("es-AR")}€
                    </td>
                  </tr>
                  <tr className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                      Total Honorarios Procurador
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      Incluido
                    </td>
                  </tr>
                  <tr className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                      Importe total
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {plan?.amount.toLocaleString("es-AR")}€
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p>
          Dada la situación de insolvencia del cliente, ambas Partes acuerdan
          fraccionar los honorarios para que sean abonados de manera mensual,
          del siguiente modo:
        </p>
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 my-0">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Resumen de Pagos
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Importe
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                      {plan?.total_installments > 0
                        ? "Pago inicial"
                        : "Pago único"}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {plan?.initial_payment.toLocaleString("es-AR")}€
                    </td>
                  </tr>
                  {plan?.total_installments > 0 && (
                    <tr className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                        {plan?.total_installments} pagos mensuales
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {plan?.installment_amount}€
                      </td>
                    </tr>
                  )}
                  {plan?.final_payment > 0 && (
                    <tr className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                        Pago final
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {plan?.final_payment.toLocaleString("es-AR")}€
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p>
          Los pagos podrán efectuarse mediante ingreso en cuenta, transferencia
          bancaria, o bien mediante tarjeta en los días de pago señalados en el
          cuadro anterior. Se designan los siguientes números de cuenta:
        </p>

        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 my-0">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Banco
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      IBAN
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Concepto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* {bankAccouts.map((bank) => ( */}
                  <tr
                    className="divide-x divide-gray-200"
                    key={bankAccouts[0].id}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                      {bankAccouts[0].name}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {bankAccouts[0].iban}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {bankAccouts[0].concept}
                    </td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ul>
          <li>
            El retraso en el pago de más de 10 días, conllevará una penalización
            de UN (1) euro por día de retraso en el abono de la misma, que
            podrán ser reclamados judicialmente, junto con las facturas libradas
            al efecto.
          </li>
          <li>
            El retraso en 3 o más pagos fraccionados, conllevará, a elección de
            APTD, la rescisión del presente contrato por impago, renunciando a
            la venia profesional. Ello, conllevará la pérdida de las cantidades
            entregadas a cuenta, y, asimismo la posibilidad de reclamación
            judicial de los honorarios pendientes.
          </li>
        </ul>
        <div>
          <div className="grid lg:grid-cols-2 border lg:divide-x">
            <div>
              <div className="bg-primary text-white text-center">
                <p className="py-1 m-0">¿Qué se incluye?</p>
              </div>
              <div className="px-2">
                <ul>
                  <li>Estudio económico.</li>
                  <li>
                    Gestión Documental a través de Portal de clientes y canal de
                    comunicación privado.
                  </li>
                  <li>
                    Presentación de la demanda de concurso y seguimiento del
                    procedimiento por todos sus trámites hasta su conclusión.
                  </li>
                  <li>Costes de Procurador colaborador reducidos.</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="bg-primary text-white text-center">
                <p className="py-1 m-0">¿Qué no se incluye?</p>
              </div>
              <div className="px-2">
                <ul>
                  <li>
                    Gastos de otros profesionales que deban intervenir en el
                    procedimiento (notaría, Registro, Administrador Concursal o
                    Procurador).
                  </li>
                  <li>
                    Defensa por Abogado y Procurador que los acreedores hayan
                    instado en contra de los clientes fuera del concurso.
                  </li>
                  <li>
                    Interposición de cualquier otra demanda a solicitud del
                    cliente.
                  </li>
                  <li>
                    Tasas Judiciales que deba abonar el CLIENTE por la
                    interposición de Recursos durante el procedimiento.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p>
          El CLIENTE conoce, acepta y entiende la presente hoja de encargo y su
          ANEXO, a tal efecto, suscribe en conjunto con APTD la presente hoja de
          encargo, y el anexo que forma parte íntegra de la misma.{" "}
        </p>
      </div>
    </div>
  );
};

export default EncargoLSO;
