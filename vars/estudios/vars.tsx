import { Page, Text, View, Document, Image, pdf } from "@react-pdf/renderer";
import createTw from "react-pdf-tailwind";
import { formatDate } from "shared/helpers";

export const LSOPDF = async (fecha: any, data: any, firma: any) => {
  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ["Inter"],
      },
      extend: {
        colors: {
          custom: "#bada55",
        },
      },
    },
  });

  const blob = await pdf(
    <Document>
      <Page
        size="A4"
        style={tw(
          "px-16 py-8 leading-7 text-[12px] text-gray-500 text-justify"
        )}
      >
        <View style={tw("flex justify-start")}>
          <Image
            src="./../../../../Logo-aptd.png"
            style={tw("h-14 w-40 object-contain")}
          />
        </View>
        <Text style={tw("text-right pb-6")}>
          En Barcelona, a {formatDate(fecha, "medium", "es")}.
        </Text>
        <Text
          style={tw("font-semibold text-[14px] text-gray-800 text-center pb-6")}
        >
          HOJA DE ENCARGO PROFESIONAL - PROCEDIMIENTO CONCURSAL DE PERSONA
          FÍSICA.
        </Text>
        <Text style={tw("font-bold text-[14px] text-gray-800 pb-2")}>
          REUNIDOS
        </Text>
        <Text style={tw("pb-6")}>
          De una parte, D. {data.name + " " + data.surname}, mayor de edad, de
          estado civil {data.civil}, con DNI/NIE/Pasaporte {data.dni}, e-mail{" "}
          {data.email} y teléfono {data.phone}, actuando en su nombre propio y
          derecho (en adelante el CLIENTE).
        </Text>
        <Text style={tw(" pb-6")}>
          De otra parte, D. CRISTIAN TANASE, mayor de edad, actuando en nombre y
          representación de la mercantil CORMEUM GLOBAL S.L. (comercialmente
          conocido como ABOGADOS PARA TUS DEUDAS), mercantil domiciliada en
          08008-Barcelona, Calle Rosselló 216, Planta 11 y provista de CIF
          B67209791 e inscrita en el Registro Mercantil de Barcelona (en
          adelante, APTD).
        </Text>
        <Text style={tw(" pb-6")}>
          Así mismo, EL CLIENTE autoriza a CORMEUM GLOBAL SL a realizar el apud
          acta a favor de Victoria Arias Cortés con NIF 73159906B, colegiada 407
          del Ilustre Colegio de Procuradores de Zaragoza.
        </Text>
        <Text style={tw("pb-6")}>
          Cada una de las partes podrá ser denominada individualmente o
          conjuntamente como “La Parte” o “Las Partes”.
        </Text>
        <Text style={tw("pb-6")}>
          Ambas Partes se reconocen mutuamente su capacidad para otorgar el
          presente documento, y, en su conformidad EXPONEN:
        </Text>
        <View style={tw("flex flex-col w-[476px]")}>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>I.</Text>
            <Text>
              APTD es una firma legal especializada en la intermediación y
              negociación de deudas con entidades financieras y todo tipo de
              acreedores comerciales, que cuenta con Abogados expertos en
              derecho bancario y concursal
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>II.</Text>
            <Text>
              El CLIENTE, previa información por parte de APTD, ha expresado que
              se encuentra en una situación de insolvencia (situación
              dificultosa que le impide cumplir con sus obligaciones presentes
              y/o futuras), y está interesado en la contratación de servicios
              jurídicos que le permitan iniciar un procedimiento concursal de
              persona física, comúnmente conocida como Ley de la Segunda
              Oportunidad.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>III.</Text>
            <Text>
              Que El CLIENTE y APTD han alcanzado un acuerdo en virtud del cual
              APTD instará el procedimiento concursal en beneficio e interés del
              cliente, mediante los letrados a los que APTD encomiende su
              defensa, y/o aquellos colaboradores jurídicos externos que la
              mercantil designe, llegado el caso, otorgando el presente CONTRATO
              DE ARRENDAMIENTO DE SERVICIOS, y de conformidad con las normas de
              deontología profesional que regulan el ejercicio de la Abogacía,
              todo ello con arreglo a las siguientes
            </Text>
          </View>
        </View>
        <Text style={tw("pb-2 text-[14px] text-gray-800")}>ESTIPULACIONES</Text>
        <Text style={tw("pb-2 text-gray-800")}>
          PRIMERA.- Objeto del contrato
        </Text>
        <Text style={tw("pb-2 text-gray-800")}>
          1.1. Actuaciones judiciales:
        </Text>
        <Text style={tw("pb-6")}>
          El presente acuerdo tiene por objeto la prestación de Servicios
          Profesionales de dirección letrada y defensa en el marco del concurso
          de acreedores de persona física, no implicando, en consecuencia,
          vínculo laboral alguno.
        </Text>
        <Text style={tw("pb-6")}>El servicio contratado incluye: </Text>
        <View style={tw("flex flex-col w-[460px]")}>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>·</Text>
            <Text>
              Acompañamiento para avanzar en la recopilación de documentación a
              través del Portal de Clientes de APTD, que servirá para remitir
              documentación y como canal principal de comunicación con el
              Abogado.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>·</Text>
            <Text>
              Interposición de solicitud judicial de concurso, y tramitación o
              personación en el procedimiento con la finalidad de alcanzar un
              plan de pagos o la exoneración de las deudas una vez haya
              entregado EL CLIENTE toda la documentación obligatoria solicitada
              y ésta sea suficiente para su presentación, tras el primer pago
              fraccionado de los honorarios acordados.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>·</Text>
            <Text>
              Para llevar a cabo la prestación de los Servicios será de
              necesaria intervención contar con un Procurador. Este
              interviniente es obligatorio y necesario por Ley, y ostenta la
              representación del CLIENTE ante los Tribunales.
            </Text>
          </View>
        </View>
        <Text style={tw("pb-6")}>
          Las partes acuerdan que estos servicios se desarrollarán durante el
          tiempo necesario para lograr el objetivo establecido y mientras sea
          posible alcanzar la conclusión el concurso por insuficiencia de masa
          activa judicial, y, por tanto, se entenderán finalizados cuando no sea
          posible avanzar en este proceso, ya sea por haber alcanzado un acuerdo
          con los acreedores, por resultar éste imposible, o por haber
          finalizado el procedimiento judicial de concurso consecutivo, o
          resultar imposible su continuación ya sea por el incumplimiento de los
          requisitos o por cualquier otra circunstancia.
        </Text>
        <Text style={tw("pb-2 text-gray-800")}>
          1.2. Limitaciones a la prestación del servicio:
        </Text>
        <View style={tw("flex flex-col w-[460px]")}>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>a.</Text>
            <Text>
              APTD en ningún caso garantiza el resultado del procedimiento
              concursal, así como tampoco la exoneración de las deudas (esto es
              el perdón de las deudas), ni total, ni parcialmente.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>b.</Text>
            <Text>
              No se incluye la tramitación de ningún otro procedimiento que no
              sea el proceso concursal, que deberán tarificarse y abonarse
              separadamente. A modo enunciativo pero no limitativo:
              Procedimientos Monitorios, Verbales, Ordinarios, Ejecutivos,
              Laborales, Administrativos o Penales.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>c.</Text>
            <Text>
              Asimismo, los honorarios de otros participantes en el
              procedimiento concursal no se encuentran incluidos. A modo
              enunciativo por sin limitarse a ellos: Procurador, Notario, o
              Administrador Concursal.
            </Text>
          </View>
        </View>
        <Text style={tw("pb-2 text-gray-800")}>
          1.3. Agilidad de procesos, acceso de los clientes a los expedientes y
          portal de clientes.
        </Text>
        <Text style={tw("pb-6")}>
          APTD ha diseñado un sistema de gestión de procesos (Portal de
          Clientes) que permite agilizar los trámites y reducir los costes para
          el cliente. Por ello se promoverá el que EL CLIENTE pueda consultar
          telemáticamente su expediente para que en cualquier momento pueda
          estar informado de su situación y avance.
        </Text>
        <Text style={tw("pb-2 text-gray-800")}>
          1.4. Transparencia. Información y documentación.
        </Text>
        <Text style={tw("pb-6")}>
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
        </Text>
        <Text style={tw("pb-6")}>
          Asimismo, EL CLIENTE reconoce que ha sido informado por parte de APTD
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
        </Text>
        <Text style={tw("pb-6")}>
          Asimismo, EL CLIENTE reconoce haber sido informado y acepta la
          posibilidad de subasta o liquidación de los bienes que sean de su
          propiedad en el mismo proceso.
        </Text>
        <Text style={tw("pb-2 text-gray-800")}>
          SEGUNDA.- Precio y forma de pago
        </Text>
        <Text style={tw("pb-6")}>
          Los honorarios profesionales a satisfacer por el CLIENTE para la
          tramitación del procedimiento concursal de persona jurídica se fijan
          según cuantía y forma de pago Anexo número 1 al presente documento.
        </Text>
        <Text style={tw("pb-2 text-gray-800")}>
          TERCERA.- Desistimiento del contrato conforme a la Ley de Consumidores
          y Usuarios.
        </Text>
        <Text style={tw("pb-6")}>
          Tras la contratación, EL CLIENTE podrá cancelar y desistir de la misma
          en un plazo de 14 días naturales, con o sin causa justificada, y sin
          ningún tipo de penalización, siempre y cuando el servicio no se
          hubiera prestado ya por APTD.
        </Text>
        <Text style={tw("pb-6")}>
          El desistimiento podrá ser comunicado por cualquier medio que deje
          constancia de su recepción, y APTD tendrá derecho a hacer suyas o
          reclamar los gastos que se hayan producido durante este periodo.
        </Text>
        <Text style={tw("pb-2 text-gray-800")}>
          CUARTA.- Finalización anticipada del encargo profesional.
        </Text>
        <Text style={tw("pb-6")}>
          Transcurridos los 14 días indicados en la estipulación tercera, EL
          CLIENTE, en cualquier momento del proceso, puede ejercitar su derecho
          a desistir libremente del presente contrato, si bien estará obligado a
          abonar los honorarios incurridos según las siguientes fases:
        </Text>
        <View style={tw("flex flex-col w-[460px]")}>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>1.</Text>
            <Text>
              El 50% de los honorarios si éstos no se hubieren devengado.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>2.</Text>
            <Text>
              Aquellos honorarios pendientes según la mensualidad en la que se
              encuentren.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>2.</Text>
            <Text>
              En aquellos supuestos en los que se haya solicitado la conclusión
              del concurso por insuficiencia de masa activa, el 100% de los
              honorarios.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>2.</Text>
            <Text>
              En aquellos supuestos en los que se haya solicitado la exoneración
              de las deudas, el 100% de los honorarios.
            </Text>
          </View>
        </View>
        <Text style={tw("pb-6")}>
          En caso de incumplimiento de los términos de pago por parte del
          CLIENTE, APTD podrá interrumpir la tramitación de expediente, e
          incluso desistir del contrato, y renunciar a la defensa letrada del
          procedimiento judicial una vez iniciado, haciendo suyas las cantidades
          cobradas en concepto de honorarios.
        </Text>
        <Text style={tw("pb-6")}>
          Las cuotas de los honorarios no vencidas y no pagadas, se comunicarán
          como créditos contra la masa por lo que serán comunicados por APTD al
          Administrador Concursal y/o al Juzgado designado para el concurso de
          acreedores del cliente que firma la presente hoja de encargo.
        </Text>
        <Text style={tw("pb-6")}>
          El CLIENTE tiene la obligación de comunicar de forma inmediata a APTD
          el nombramiento de Administrador Concursal por el Juzgado, con el fin
          de poder cumplir todos los plazos legales. La falta de comunicación
          inmediata supondrá el incumplimiento del contrato por parte del
          cliente.
        </Text>
        <Text style={tw("pb-2 text-gray-800")}>
          QUINTA.- Devolución de cuotas.
        </Text>
        <Text style={tw("pb-6")}>
          Se prevé expresamente que las concurrencias de las siguientes
          circunstancias son causa de la no devolución de las cantidades
          abonadas en concepto de honorarios:
        </Text>
        <View style={tw("flex flex-col w-[460px]")}>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>a.</Text>
            <Text>
              Mala intención por parte del cliente que le inhabilite para la
              conclusión el concurso por falta de masa activa, plan de pagos o
              convenio: Falsedad documental, incorrección de datos facilitados,
              mala fe, ocultación de información, alzamiento de bienes,
              ocultación de activos, utilización de crédito durante el
              procedimiento, entre otros.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>b.</Text>
            <Text>
              Falta de diligencia por parte del cliente que impide el desarrollo
              del procedimiento: falta de entrega de la documentación requerida,
              falta de atención a los requerimientos, falta de comunicación con
              la empresa, falta de atención a las llamadas telefónicas o
              correos, entre otros.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>c.</Text>
            <Text>
              No admisión a trámite de la demanda de concurso consecutivo por
              cuestiones imputables al cliente.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>d.</Text>
            <Text>
              Desacuerdo por parte del cliente con terceros actores del proceso
              que impidan finalizar el proceso.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>e.</Text>
            <Text>
              Incumplimiento de las excepciones legales que no permitan la
              finalización del encargo profesional como era de esperar.
            </Text>
          </View>
        </View>
        <Text style={tw("pb-2 text-gray-800")}>
          SEXTA.- Gastos de otros profesionales.
        </Text>
        <Text style={tw("pb-6")}>
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
        </Text>
        <Text style={tw("pb-6")}>
          APTD aceptará aquellos profesionales que el CLIENTE designe
          libremente, no siendo preceptiva la intervención de aquellos con los
          que pudiere mantener alguna relación de colaboración más allá de la
          representación del cliente, no percibiendo remuneración alguna de
          éstos.
        </Text>
        <Text style={tw("pb-6")}>
          En caso de que el proceso se lleve a cabo como unidad familiar, los
          costes de los profesionales que intervienen pueden ser mayores, al
          aumentar los miembros que se acogen a dicho proceso.
        </Text>
        <Text style={tw("pb-6")}>
          Asimismo, el CLIENTE manifiesta que ha sido informado por parte de
          ABOGADOS PARA TUS DEUDAS que, entre otros requisitos, deberá demostrar
          que tiene capacidad económica suficiente para poder hacer frente a los
          créditos contra la masa y determinados créditos públicos como
          requisito indispensable.
        </Text>
        <Text style={tw("pb-2 text-gray-800")}>
          SÉPTIMA.- Terminación y resolución del contrato.
        </Text>
        <Text style={tw("pb-6")}>
          Son causas de terminación y resolución del contrato las siguientes:
        </Text>
        <View style={tw("flex flex-col w-[460px]")}>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>a.</Text>
            <Text>
              Su terminación normal, ya sea por haberse cumplido la prestación o
              por acuerdo de las partes. Se entiende que APTD ha finalizado la
              prestación una vez que se ha alcanzado convenio, exoneración o
              plan de pagos en fase judicial, así como la resolución que pone
              fin a la vía judicial en primera instancia.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>b.</Text>
            <Text>
              Por incumplimiento de las partes de alguna de las cláusulas del
              presente contrato sin que este incumplimiento hubiera sido
              subsanado dentro de los cinco días siguientes a la notificación
              efectuada por la otra parte solicitando su subsanación.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>c.</Text>
            <Text>
              Por incumplimiento de los requisitos para la admisión de la
              demanda de concurso por parte de EL CLIENTE.
            </Text>
          </View>
        </View>
        <Text style={tw("pb-2 text-gray-800")}>OCTAVA.- Notificaciones.</Text>
        <Text style={tw("pb-6")}>
          El cliente acepta y ratifica con la firma del presente documento que
          cualquier notificación / comunicación emitida por ABOGADOS PARA TUS
          DEUDAS al correo electrónico facilitado, a la dirección postal o al
          teléfono señalado anteriormente, se considera válido a plenos efectos
          legales. La ausencia de respuesta por parte del cliente no derivará en
          responsabilidad alguna para ABOGADOS PARA TUS DEUDAS.
        </Text>
        <Text style={tw("pb-2 text-gray-800")}>
          NOVENA.- Protección de Datos.
        </Text>
        <View style={tw("flex flex-col w-[460px]")}>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>a.</Text>
            <Text>
              El CLIENTE autoriza expresamente a APTD a la inclusión en sus
              ficheros y tratamiento de todos los datos de carácter personal que
              le fueran facilitados para el mantenimiento de la futura relación
              contractual, la elaboración de estudios estadísticos y, en su
              caso, el envío de información comercial.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>b.</Text>
            <Text>
              Dichos datos permanecerán en los ficheros de la mercantil y
              estarán sujetos mediante solicitud escrita del interesado, a los
              derechos de acceso, rectificación, cancelación, oposición,
              portabilidad, olvido y limitación del tratamiento de sus datos de
              acuerdo con la legislación vigente, mediante el envío de e-mail al
              correo: legal@abogadosparatusdeudas.es.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>c.</Text>
            <Text>
              Mediante la firma de la presente hoja de encargo el cliente
              autoriza expresamente a APTD a la cesión de los datos facilitados
              de carácter personal a terceros o colaboradores que intervienen en
              el proceso anexo a los servicios contratados.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>c.</Text>
            <Text>
              En dicho caso, se realizará la misma con la única finalidad de la
              continuación en la prestación de servicios profesionales
              requeridos por EL CLIENTE, en favor de cualquier otra entidad que
              APTD considere oportuno.
            </Text>
          </View>
          <View style={tw("flex-row pb-6")}>
            <Text style={tw("mx-2")}>c.</Text>
            <Text>
              El cliente, autoriza a APTD, para que pueda comunicar al cotitular
              del presente contrato, datos personales e informar y notificar del
              estado y requerimientos relacionados con el procedimiento de
              Segunda Oportunidad, al que el cliente se encuentra acogido.
              Cualquier comunicación realizada al autorizado/a, será considerada
              como notificación al cliente, asumiendo el/la autorizado/a, la
              obligación de comunicarlo en el plazo más breve posible, bajo su
              propia responsabilidad. Se pone en conocimiento del cliente, que
              para revocar la anterior autorización, será necesario remitir
              escrito de cancelación, firmado, por correo certificado a la
              dirección de CORMEUM GLOBAL S.L, domiciliada en Carrer de Rosselló
              216, Planta 11, 08008, Barcelona.
            </Text>
          </View>
        </View>
        <Text style={tw("pb-2 text-gray-800")}>
          DÉCIMA.- Jurisdicción competente.
        </Text>
        <Text style={tw("pb-6")}>
          Las partes acuerdan someterse, para la resolución de cualquier
          divergencia que pudiera existir tanto en la interpretación, aplicación
          o ejecución del presente contrato, a la jurisdicción de los Juzgados y
          Tribunales de Barcelona, con renuncia expresa a su propio fuero en
          caso de ser distinto.
        </Text>
        <Text style={tw("pb-6")}>
          Y, de conformidad por ambas partes, suscriben la presente hoja de
          encargo profesional mediante firma electrónica, en la fecha y lugar
          indicados en el encabezamiento del presente documento.
        </Text>
        <Image src={firma} style={tw("h-20 w-64 object-contain")} />
      </Page>
    </Document>
  ).toBlob();

  return blob;
};
