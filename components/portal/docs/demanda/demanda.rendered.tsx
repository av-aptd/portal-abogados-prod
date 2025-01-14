import { Page, Text, View, Document, Image, pdf } from "@react-pdf/renderer";
import { propertiesMap } from "shared/dictionaries/propertyDict";
import { formatDate, getPropertyValueMap } from "shared/helpers";

import createTw from "react-pdf-tailwind";

const DemandaRendered = async (
  fecha: any,
  client: any,
  clientData: any,
  aptdInfo: any,
  abogado: any,
  procurador: any
) => {
  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ["Inter"],
      },
      extend: {
        colors: {
          custom: "#1AABE3",
        },
      },
    },
  });

  const isSituation = (value: string) => {
    return aptdInfo.situacionDeudor.includes(value);
  };

  const getPropertyValue = (propertyKey: string, json: string): string => {
    return JSON.parse(json)[propertyKey];
  };

  const blob = await pdf(
    <Document>
      <Page
        size="A4"
        style={tw("px-8 py-8 leading-7 text-[12px] text-gray-500")}
      >
        <View style={tw("flex justify-start")}>
          <Image
            src="./../../../../../Logo-aptd.png"
            style={tw("h-14 w-40 object-contain")}
          />
        </View>

        <Text
          style={tw(
            "font-bold text-[14px] leading-5 text-gray-800 text-center pb-2 pt-6 uppercase"
          )}
        >
          FORMULARIO PARA LA SOLICITUD DE CONCURSO CONSECUTIVO
        </Text>
        <Text
          style={tw(
            "font-semibold text-[12px] leading-5 text-gray-800 text-center pb-12 uppercase"
          )}
        >
          AL JUZGADO MERCANTIL DE {clientData.provincia}
        </Text>
        <View style={tw("py-6")}>
          <Text style={tw("pb-2 font-bold text-gray-800 text-[13px]")}>
            A) DATOS DEL DEUDOR
          </Text>

          <Text style={tw("pb-0 pl-4")}>
            1. Nombre y apellidos: {client.name + " " + client.surname}
          </Text>
          <Text style={tw("pb-0 pl-4")}>2. NIF/NIE: {clientData.dni}</Text>
          <Text style={tw("pb-0 pl-4")}>
            3. Datos del Registro Civil: {clientData.direccion},{" "}
            {clientData.ciudad}
          </Text>
          <Text style={tw("pb-0 pl-4")}>
            4. ¿Tiene la condición de empresario, autónomo o asimilados?:
          </Text>
          <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
            <View style={tw("flex flex-row")}>
              {clientData.tipoPersona == "persona" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>NO</Text>
            </View>

            <View style={tw("flex flex-row pl-20")}>
              {clientData.tipoPersona == "autonomo" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>
                SI,{" "}
                <Text style={tw("italic")}>
                  indique la actividad:
                  {clientData.tipoPersona == "autonomo" && clientData.actividad}
                </Text>
              </Text>
            </View>
          </View>
          <Text style={tw("pb-0 pl-4")}>
            5. Lugar de residencia o domicilio profesional, si es distinto del
            anterior:
          </Text>

          <Text style={tw("pb-0 pl-4")}>
            6. Modificación del domicilio en los últimos seis meses:
          </Text>

          <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
            <View style={tw("flex flex-row")}>
              {clientData.cambioEmprarodamiento == "no" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>NO</Text>
            </View>

            <View style={tw("flex flex-row pl-20")}>
              {clientData.cambioEmprarodamiento == "yes" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>SI</Text>
            </View>
          </View>

          <Text style={tw("pb-0 pl-4")}>
            7. Estado civil y régimen económico matrimonial:{" "}
            {clientData.estadoCivil}
          </Text>
          <View style={tw("pb-4 pl-20 pt-2 text-[10px]")}>
            <View style={tw("flex flex-row")}>
              {clientData.estadoCivil == "soltero" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>Soltero/a</Text>
            </View>
            <View style={tw("flex flex-row")}>
              {clientData.estadoCivil == "pareja" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>Pareja de hecho</Text>
            </View>
            <View style={tw("flex flex-row")}>
              {clientData.estadoCivil == "casado" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>
                Casado/a, en régimen de:{" "}
                {clientData.estadoCivil == "casado" && clientData.regimen}
              </Text>
            </View>
            <View style={tw("flex flex-row")}>
              {clientData.estadoCivil == "divorciado" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <View style={tw("flex flex-row")}>
                <Text style={tw("pl-2 pt-1")}>
                  Divorciado/a - Separado, ¿existen medidas reguladoras
                  económicas?
                </Text>
                <View style={tw("pb-4 pl-10 flex flex-row text-[10px]")}>
                  <View style={tw("flex flex-row")}>
                    {clientData.cambioEmprarodamiento == "no" ? (
                      <View
                        style={tw(
                          "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                        )}
                      />
                    ) : (
                      <View
                        style={tw(
                          "border-2 border-gray-500 w-6 h-6 rounded-full"
                        )}
                      />
                    )}
                    <Text style={tw("pl-2 pt-1")}>NO</Text>
                  </View>

                  <View style={tw("flex flex-row pl-6")}>
                    {clientData.tipoPersona == "yes" ? (
                      <View
                        style={tw(
                          "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                        )}
                      />
                    ) : (
                      <View
                        style={tw(
                          "border-2 border-gray-500 w-6 h-6 rounded-full"
                        )}
                      />
                    )}
                    <Text style={tw("pl-2 pt-1")}>SI</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={tw("py-0")}>
            <Text style={tw("pb-0 pl-4")}>
              8. Datos del cónyuge (si el régimen económico matrimonial implica
              comunidad de bienes):
            </Text>
            <Text style={tw("pb-0 pl-8")}>
              1. Nombre y apellidos:{" "}
              {clientData.estadoCivil == "casado" &&
                clientData.conyuge.nombre + " " + clientData.conyuge.apellido}
            </Text>
            <Text style={tw("pb-0 pl-8")}>
              2. NIF/NIE:{" "}
              {clientData.estadoCivil == "casado" && clientData.conyuge.dni}
            </Text>
            <Text style={tw("pb-0 pl-8")}>
              3. Lugar de residencia (si es distinto del otro cónyuge):
            </Text>
            <Text style={tw("pb-0 pl-8")}>
              4. ¿Ha solicitado el cónyuge el concurso?{" "}
            </Text>
            <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
              <View style={tw("flex flex-row")}>
                {clientData.coyugeConcurso == "no" ? (
                  <View
                    style={tw(
                      "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                    )}
                  />
                ) : (
                  <View
                    style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                  />
                )}
                <Text style={tw("pl-2 pt-1")}>NO</Text>
              </View>

              <View style={tw("flex flex-row pl-20")}>
                {clientData.coyugeConcurso == "yes" ? (
                  <View
                    style={tw(
                      "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                    )}
                  />
                ) : (
                  <View
                    style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                  />
                )}
                <Text style={tw("pl-2 pt-1")}>SI</Text>
              </View>
            </View>
            <Text style={tw("pb-0 pl-8")}>
              5. ¿Son copropietarios de la vivienda habitual?{" "}
            </Text>
            <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
              <View style={tw("flex flex-row")}>
                {clientData.copropietarios == "no" ? (
                  <View
                    style={tw(
                      "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                    )}
                  />
                ) : (
                  <View
                    style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                  />
                )}
                <Text style={tw("pl-2 pt-1")}>NO</Text>
              </View>

              <View style={tw("flex flex-row pl-20")}>
                {clientData.copropietarios == "yes" ? (
                  <View
                    style={tw(
                      "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                    )}
                  />
                ) : (
                  <View
                    style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                  />
                )}
                <Text style={tw("pl-2 pt-1")}>SI</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      <Page
        size="A4"
        style={tw("px-8 py-8 leading-7 text-[12px] text-gray-500")}
      >
        <View style={tw("py-6")}>
          <Text style={tw("pb-2 font-bold text-gray-800 text-[13px]")}>
            B) DATOS DE LA PARTE SOLICITANTE
          </Text>

          <View style={tw("flex flex-row pl-4")}>
            <View
              style={tw(
                "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
              )}
            />

            <Text style={tw("pl-2 pt-1")}>Con procurador</Text>
          </View>

          <Text style={tw("pb-0 pl-12")}>
            Identificación: {procurador.name} {procurador.surname}
          </Text>
          <Text style={tw("pb-0 pl-12")}>Apoderamiento:</Text>
          <Text style={tw("pb-0 pl-12 text-[10px] pb-4")}>
            Solicita el otorgamiento apud acta al amparo del artículo 24 de la
            Ley Enjuiciamiento Civil
          </Text>

          <View style={tw("flex flex-row pl-4")}>
            <View
              style={tw("border-2 border-gray-500  w-6 h-6 rounded-full")}
            />
            <Text style={tw("pl-2 pt-1")}>Justicia gratuita:</Text>
            <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
              <View style={tw("flex flex-row")}>
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />

                <Text style={tw("pl-2 pt-1")}>SI</Text>
              </View>

              <View style={tw("flex flex-row pl-20")}>
                <View
                  style={tw(
                    "border-2 bg-gray-500 border-gray-500 w-6 h-6 rounded-full"
                  )}
                />

                <Text style={tw("pl-2 pt-1")}>NO</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page
        size="A4"
        style={tw("px-8 py-8 leading-7 text-[12px] text-gray-500")}
      >
        <View style={tw("py-6")}>
          <Text style={tw("pb-2 font-bold text-gray-800 text-[13px]")}>
            C) DATOS DE LA INSOLVENCIA
          </Text>
          <View style={tw("flex flex-row")}>
            <Text style={tw("pb-0 pl-4")}>1. Clase de insolvencia: </Text>
            <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
              <View style={tw("flex flex-row")}>
                {clientData.tipoInsolvencia == "actual" ? (
                  <View
                    style={tw(
                      "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                    )}
                  />
                ) : (
                  <View
                    style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                  />
                )}
                <Text style={tw("pl-2 pt-1")}>Actual</Text>
              </View>

              <View style={tw("flex flex-row pl-20")}>
                {clientData.tipoInsolvencia == "inminente" ? (
                  <View
                    style={tw(
                      "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                    )}
                  />
                ) : (
                  <View
                    style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                  />
                )}
                <Text style={tw("pl-2 pt-1")}>Inminente</Text>
              </View>
            </View>
          </View>
          <Text style={tw("pb-2 pl-4")}>
            2. Hecho/s de los que deriva la situación de insolvencia{" "}
            <Text style={tw("pl-2 text-[10px]")}>
              (breve referencia a desarrollar en la Memoria):
            </Text>
          </Text>
          <View style={tw("pl-4")}>
            {isSituation("sobreendeudamiento") && (
              <Text style={tw("pb-4")}>
                {client.name} se vió abocado a solicitar financiaciones para
                cubrir financiaciones anteriores ante la imposibilidad de hacer
                frente a todas las cuotas mensuales. Uno de los principales
                motivos ha sido el devengo de comisiones e intereses, los cuáles
                convertían las deudas en interminables e inasumibles. De esta
                forma, {client.name} en aras de cumplir con sus obligaciones
                crediticias solicitó auxilio financiero a otras entidades para
                ajustar las nuevas cuotas a su capacidad económica, hecho que no
                se ha dado por las repercusiones desconocidas de las cláusulas y
                prácticas habituales de los acreedores.
              </Text>
            )}

            {isSituation("estafa") && (
              <>
                <Text style={tw("pb-4")}>
                  {client.name} sufrió una situación de engaño, fraudulenta, en
                  la que en aras de contribuir a una mejor economía personal y
                  laboral se vió abocado a un fracaso económico, fruto del
                  engaño o falsas expectativas. Esta posible estafa generó una
                  situación de insolvencia irrevocable a {client.name}. La
                  situación era del todo objetivamente creíble, por lo que el
                  error inducido en mi cliente era irremediable.
                </Text>
                <Text style={tw("pb-4")}>
                  Esta situación ha conllevado la imposibilidad de hacer frente
                  a las deudas hasta la fecha presente.
                </Text>
              </>
            )}

            {isSituation("desempleo") && (
              <Text style={tw("pb-4")}>
                {client.name} sufrió un desempleo por lo que sus ingresos han
                descendido notablemente y ha generado la imposibilidad de hacer
                frente al pago de todas sus obligaciones dinerarias y
                crediticias. La situación económica y laboral de forma
                particular y a nivel estatal no ha ayudado a que {client.name}{" "}
                tuviera la oportunidad de ofrecer una cuota superior o el pago
                de las cuotas impagadas por la bajada de ingresos desde la fecha
                en la que estuvo en desempleo. Es por este motivo que mi
                representado se ve en la obligación de presentar la actual
                solicitud de concurso.
              </Text>
            )}

            {isSituation("divorcio") && (
              <Text style={tw("pb-4")}>
                El motivo principal de la misma se genera a raíz de una
                modificación sustancial y estructural de la situación familiar
                del deudor, habida cuenta que fruto del cambio del estado civil
                tuvo que realizar un esfuerzo económico extraordinario, tanto en
                términos de sostenimiento de las cargas familiares, como de
                acceso a la vivienda. Dicha situación se hace insostenible ante
                el aumento de gastos y la disminución de apoyo económico por
                parte de su anterior pareja.
              </Text>
            )}

            {isSituation("perdidas") && (
              <Text style={tw("pb-4")}>
                {client.name} ha apostado en todo momento por el esfuerzo
                empresarial y profesional pero la situación económica de dicha
                actividad ha devenido progresivamente en una situación real de
                pérdida económica. Es por este motivo que se produce una
                situación de insolvencia que genera la imposibilidad de hacer
                frente a las deudas. {client.name} ha decidido finalmente en
                aras de cumplir con sus obligaciones, presentar la actual
                solicitud de concurso.
              </Text>
            )}

            {isSituation("incapacidad") && (
              <Text style={tw("pb-4")}>
                {client.name} sufrió una situación de incapacidad temporal
                laboral, fruto de la misma sus ingresos disminuyeron
                notablemente y no tuvo la oportunidad de aumentar los mismos por
                la incapacidad señalada. Ante esta disminución de ingresos y el
                mantenimiento de los gastos habituales para una vida digna,{" "}
                {client.name} se vio abocado a una situación real de insolvencia
                y, por ello, la imposibilidad de hacer frente al pago de las
                deudas.
              </Text>
            )}

            {isSituation("familiares") && (
              <Text style={tw("pb-4")}>
                El motivo principal de la insolvencia se genera a raíz de la
                necesidad de tratamiento médico de su familiar , y su posterior
                ingreso, habida cuenta de las carencias de nuestro sistema
                asistencial que, en numerosas ocasiones no puede llegar a tiempo
                para solventar este tipo de necesidades. Ello supuso que mi
                representado no tuviere otro remedio que endeudarse a fin de
                cubrir el alto coste económico del tratamiento, y que, lo que en
                un primer momento pudiere resultar asequible, a largo plazo no
                fue posible de sostener.
              </Text>
            )}

            {isSituation("aumento-gastos") && (
              <Text style={tw("pb-4")}>
                {client.name} tuvo que hacer frente a un aumento considerable de
                los gastos de explotación, tales como rentas, suministros… sin
                embargo el nivel de ingresos y rentabilidad se ha ido
                manteniendo, incluso disminuyendo, por lo que esta situación ha
                conllevado una verdadera insolvencia de {client.name} y por lo
                tanto la imposibilidad de poder hacer frente al pago de la
                totalidad de las deudas.
              </Text>
            )}

            {isSituation("disminucion-ventas") && (
              <Text style={tw("pb-4")}>
                Durante los últimos periodos mi cliente ha sufrido en su sector
                una disminución notable de las ventas, por lo que los ingresos y
                rentabilidad han disminuido de igual manera. Sin embargo los
                gastos han permanecido prácticamente estables durante todo este
                tiempo. Esta situación conlleva a una irremediable insolvencia
                económica y por lo tanto la imposibilidad de hacer frente al
                pago de las deudas.
              </Text>
            )}

            {isSituation("aumento-costes") && (
              <Text style={tw("pb-4")}>
                {client.name} solicitó financiación ante la expectativa de
                crecimiento económico, ya que dicha financiación apoyaría la
                inversión en recursos que generarían una mayor rentabilidad
                según el estudio realizado en el plan de futuro. Sin embargo,
                las circunstancias han devenido en un decrecimiento económico,
                sobre todo por la situación de crisis económica que ha afectado
                notablemente a mi representado.
              </Text>
            )}

            {isSituation("prestamos-acreedores") && (
              <Text style={tw("pb-4")}>
                {client.name} se fue endeudando paulatinamente a lo largo de los
                años intentando solventar las faltas de liquidez a las que no
                podía hacer frente. Al no contar con ayuda de familiares y o
                conocidos, no tuvo otra opción que intentar reunificar sus
                financiaciones, sin éxito, lo que lo llevó a una tensión de
                liquidez que finalmente le impedía realizar su actividad.
              </Text>
            )}

            {isSituation("abusividad-contenida") && (
              <Text style={tw("pb-4")}>
                {client.name} solicitó las deudas manifestadas en este
                procedimiento ante la necesidad económica, desconociendo en todo
                momento las repercusiones que podría tener en un futuro. Las
                comisiones, intereses y demás cláusulas establecidas en los
                contratos de préstamos y financiaciones han impactado
                negativamente en la economía de mi representado, sin haber
                tenido la posibilidad de comprender dichas cláusulas en ningún
                momento por falta absoluta de transparencia desde un primer
                momento. Esta situación ha generado la imposibilidad de hacer
                frente al pago real de las cuotas de las deudas contraídas.
              </Text>
            )}

            {isSituation("covid") && (
              <>
                {clientData.tipoPersona == "persona" && (
                  <Text style={tw("pb-4")}>
                    Derivado de la crisis pandémica por la situación de la
                    COVID-19, mi representado vio mermados sus ingresos, habida
                    cuenta que fue incluido en un ERTE que mermó sus ingresos,
                    así como la dificultad de cobro por parte del Servicio de
                    Empleo Público Estatal, le causó problemas de liquidez que
                    no le permitieron hacer frente a sus obligaciones
                    recurrentes, pese a que intentó acogerse a todas las
                    moratorias, éstas no fueron aceptadas por la totalidad de
                    los acreedores, lo que le subsumió en una situación de
                    sobreendeudamiento de la que, unido a la escasez de
                    ingresos, no pudo reponerse.
                  </Text>
                )}
                {clientData.tipoPersona == "autonomo" && (
                  <Text style={tw("pb-4")}>
                    Derivado de la crisis pandémica por la situación de la
                    COVID-19, mi representado vio mermados sus ingresos, habida
                    cuenta que la paralización del país debido a la crisis
                    pandémica, mermó sus ingresos hasta el nivel de no poder
                    hacer frente a sus obligaciones habituales, precisando de
                    endeudamiento para poder seguir trabajando, teniendo
                    esperanza puesta en que el mercado post pandémico mejoraría
                    o se recuperaría tal y como los indicadores económicos
                    preveían. Sin embargo, el resultado no ha sido el esperado
                    y, a fecha de hoy, no ha sido posible la recuperación
                    económica de la actividad en las mismas condiciones
                    económicas que había venido desarrollando desde antaño.
                  </Text>
                )}
              </>
            )}

            {isSituation("negocios") && (
              <Text style={tw("pb-4")}>
                {client.name} decidió iniciar un negocio, para ello se inició
                como autónomo, dándose de alta en SS y AEAT. No obstante, la
                actividad no fue como esperaba, en cuanto a ingresos de
                explotación que no fueron acordes con sus expectativas y el alto
                precio de la infraestructura que precisaba para llevarla a cabo
                (alquiler de local, coste de materiales, etc), lo que lo llevó a
                sobre endeudarse con la esperanza de poder reestructurar la
                actividad y hacerla rentable. Sin embargo, la falta de liquidez
                no le permitió reestructurar la actividad en aras a hacerla
                rentable, por lo que a mi representado no le quedó más remedio
                que presentar el concurso.
              </Text>
            )}
          </View>
          <View style={tw("pb-4")}>
            <View style={tw("flex flex-row")}>
              <Text style={tw("pb-0 pl-4")}>
                3. ¿Tiene trabajadores a cargo?
              </Text>
              <View style={tw("pb-2 pl-20 flex flex-row text-[10px]")}>
                <View style={tw("flex flex-row")}>
                  {clientData.tienesPersonas == "yes" ? (
                    <View
                      style={tw(
                        "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                      )}
                    />
                  ) : (
                    <View
                      style={tw(
                        "border-2 border-gray-500 w-6 h-6 rounded-full"
                      )}
                    />
                  )}
                  <Text style={tw("pl-2 pt-1")}>SI</Text>
                </View>

                <View style={tw("flex flex-row pl-20")}>
                  {clientData.tienesPersonas == "no" ? (
                    <View
                      style={tw(
                        "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                      )}
                    />
                  ) : (
                    <View
                      style={tw(
                        "border-2 border-gray-500 w-6 h-6 rounded-full"
                      )}
                    />
                  )}
                  <Text style={tw("pl-2 pt-1")}>NO</Text>
                </View>
              </View>
            </View>
            <Text style={tw("pb-0 pl-10 text-sm")}>
              Número de trabajadores: {clientData.trabajadores}
            </Text>
          </View>
          <Text style={tw("pb-4 pl-4")}>
            4. Valoración del activo:{" "}
            {(
              clientData.sumaCuentasBanco + clientData.sumaActivos
            ).toLocaleString("es-AR")}{" "}
            euros
          </Text>
          <Text style={tw("pb-4 pl-4")}>
            5. Cuantia del pasivo: {clientData.pasivo.toLocaleString("es-AR")}{" "}
            euros
          </Text>
          <Text style={tw("pb-4 pl-4")}>
            6. Número de acreedores: {clientData.acreedores}
          </Text>
          <Text style={tw("pb-4 pl-4")}>7. Vivienda habitual:</Text>
          <Text style={tw("pb-0 pl-8")}>
            ¿Es propietario de su vivienda habitual?
          </Text>
          <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
            <View style={tw("flex flex-row")}>
              {clientData.tipoVivienda == "hipoteca" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>SI</Text>
            </View>

            <View style={tw("flex flex-row pl-20")}>
              {clientData.tipoVivienda == "alquiler" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>NO</Text>
            </View>
          </View>
          <Text style={tw("pb-0 pl-8")}>
            En caso afirmativo, responda a las siguientes preguntas:
          </Text>

          <Text style={tw("pb-0 pl-8")}>a) ¿Está gravada con hipoteca? </Text>
          <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
            <View style={tw("flex flex-row")}>
              {clientData.tipoVivienda == "hipoteca" &&
              clientData.viviendaHabitual &&
              clientData.viviendaHabitual.gravadaHipoteca == "yes" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>SI</Text>
            </View>

            <View style={tw("flex flex-row pl-20")}>
              {clientData.tipoVivienda == "hipoteca" &&
              clientData.viviendaHabitual &&
              clientData.viviendaHabitual.gravadaHipoteca == "no" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>NO</Text>
            </View>
          </View>

          <Text style={tw("pb-0 pl-8")}>
            b) En caso afirmativo, ¿con qué entidad financiera?{" "}
            {clientData.tipoVivienda == "hipoteca" &&
              clientData.viviendaHabitual &&
              clientData.viviendaHabitual.gravadaHipoteca == "yes" &&
              clientData.viviendaHabitual.entidadFinanciera}
          </Text>

          <Text style={tw("pb-0 pl-8")}>
            c) ¿Está al corriente en el pago de las cuotas hipotecarias?{" "}
          </Text>
          <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
            <View style={tw("flex flex-row")}>
              {clientData.tipoVivienda == "hipoteca" &&
              clientData.viviendaHabitual &&
              clientData.viviendaHabitual.corrientePagoComunidad == "yes" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>SI</Text>
            </View>

            <View style={tw("flex flex-row pl-20")}>
              {clientData.tipoVivienda == "hipoteca" &&
              clientData.viviendaHabitual &&
              clientData.viviendaHabitual.corrientePagoComunidad == "no" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>NO</Text>
            </View>
          </View>

          <Text style={tw("pb-0 pl-8")}>
            d) Importe de la cuota hipotecaria mensual
          </Text>
          <Text style={tw("pb-0 pl-12")}>1.200 euros</Text>
          <Text style={tw("pb-0 pl-8")}>
            e) Límite de la responsabilidad hipotecaria
          </Text>
          <Text style={tw("pb-0 pl-12")}>1.200 euros</Text>
          <Text style={tw("pb-0 pl-8")}>f) Capital pendiente</Text>
          <Text style={tw("pb-0 pl-12")}>1.200 euros</Text>

          <Text style={tw("pb-0 pl-8")}>
            g) ¿Está al corriente en el pago de las cuotas de comunidad?
          </Text>
          <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
            <View style={tw("flex flex-row")}>
              {clientData.tipoVivienda == "hipoteca" &&
              clientData.viviendaHabitual &&
              clientData.viviendaHabitual.corrientePagoComunidad == "yes" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>SI</Text>
            </View>

            <View style={tw("flex flex-row pl-20")}>
              {clientData.tipoVivienda == "hipoteca" &&
              clientData.viviendaHabitual &&
              clientData.viviendaHabitual.corrientePagoComunidad == "no" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>NO</Text>
            </View>
          </View>

          <Text style={tw("pb-0 pl-8")}>
            h) ¿Está al corriente de pago en los impuestos que gravan la
            vivienda?
          </Text>
          <View style={tw("pb-4 pl-20 flex flex-row text-[10px]")}>
            <View style={tw("flex flex-row")}>
              {clientData.tipoVivienda == "hipoteca" &&
              clientData.viviendaHabitual &&
              clientData.viviendaHabitual.corrienteImpuestosVivienda ==
                "yes" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>SI</Text>
            </View>

            <View style={tw("flex flex-row pl-20")}>
              {clientData.tipoVivienda == "hipoteca" &&
              clientData.viviendaHabitual &&
              clientData.viviendaHabitual.corrienteImpuestosVivienda == "no" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>NO</Text>
            </View>
          </View>
        </View>
      </Page>
      <Page
        size="A4"
        style={tw("px-8 py-8 leading-7 text-[12px] text-gray-500")}
      >
        <View style={tw("py-6")}>
          <Text style={tw("pb-2 font-bold text-gray-800 text-[13px]")}>
            D) SOLUCIÓN DEL CONCURSO
          </Text>
          <View style={tw("pl-20")}>
            <View style={tw("flex flex-row")}>
              {aptdInfo.solucionConcurso == "Convenio" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>CONVENIO</Text>
            </View>
            <View style={tw("flex flex-row")}>
              {aptdInfo.solucionConcurso == "EPI plan pagos" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>EPI PLAN PAGOS</Text>
            </View>
            <View style={tw("flex flex-row")}>
              {aptdInfo.solucionConcurso == "Liquidación" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>LIQUIDACION</Text>
            </View>
            <View style={tw("flex flex-row")}>
              {aptdInfo.solucionConcurso == "Insuficiencia masa activa" ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>
                INSUFICIENCIA MASA ACTIVA{" "}
                <Text style={tw("text-[10px]")}>
                  (Artículo 37 bis Ley 16/2022 de 5 de septiembre)
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={tw("py-6")}>
          <Text style={tw("pb-2 font-bold text-gray-800 text-[13px]")}>
            E) DOCUMENTACIÓN QUE ACOMPAÑA A LA SOLICITUD
          </Text>
          <View style={tw("pl-20 text-[10px]")}>
            <View style={tw("flex flex-row")}>
              {aptdInfo.documentacionAdjunta.includes("memoria") ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>
                Documento núm. 1 - Memoria económica y jurídica
              </Text>
            </View>
            <View style={tw("flex flex-row")}>
              {aptdInfo.documentacionAdjunta.includes("inventario") ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>
                Documento núm. 2 - Inventario de bienes y derechos
              </Text>
            </View>
            <View style={tw("flex flex-row")}>
              {aptdInfo.documentacionAdjunta.includes("acreedores") ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>
                Documento núm. 3 - Relación de acreedores
              </Text>
            </View>
            <View style={tw("flex flex-row")}>
              {aptdInfo.documentacionAdjunta.includes("trabajadores") ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>
                Documento núm. 4 - Plantilla de trabajadores
              </Text>
            </View>
            <View style={tw("flex flex-row")}>
              {aptdInfo.documentacionAdjunta.includes("epi") ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>
                Documento núm. 5 - Plan de pagos sujeto a la Exoneración del
                Pasivo Insatisfecho (EPI)
              </Text>
            </View>
            <View style={tw("flex flex-row")}>
              {aptdInfo.documentacionAdjunta.includes("otros") ? (
                <View
                  style={tw(
                    "border-2 border-gray-500 bg-gray-500 w-6 h-6 rounded-full"
                  )}
                />
              ) : (
                <View
                  style={tw("border-2 border-gray-500 w-6 h-6 rounded-full")}
                />
              )}
              <Text style={tw("pl-2 pt-1")}>
                Documento núm. 6 - otros documentos ({" "}
                {aptdInfo.otraDocumentacion} )
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page
        size="A4"
        style={tw("px-8 py-8 leading-7 text-[12px] text-gray-500")}
      >
        <View style={tw("py-6")}>
          <Text style={tw("pb-2 font-bold text-gray-800 text-[13px]")}>
            F) OBSERVACIONES
          </Text>
          <Text style={tw("pb-4 pl-4")}>
            PRIMERA.- En todos aquellos defectos advertidos por el Juzgado esta
            parte solicita expresamente plazo para la eventual subsanación de
            los mismos.
          </Text>
          <Text style={tw("pb-4 pl-4")}>
            SEGUNDA.- Esta parte manifiesta que mi representado no ha sido
            condenado por delito alguno que pudiere afectar a la concesión de la
            exoneración del pasivo insatisfecho. Por ende, se autoriza
            expresamente al Juzgado a la obtención y consulta de las bases de
            datos y registros de penados de la Administración de Justicia.
          </Text>
          <Text style={tw("pb-4 pl-4")}>
            TERCERA.- Esta parte autoriza cualesquiera consulta al Punto Neutro
            Judicial por si pudieren aparecer cualesquiera otros activos o
            pasivos existentes de los que esta representación no haya podido
            obtener conocimiento, tales como cuentas bancarias, vehículos,
            bienes muebles o inmuebles.
          </Text>
          <Text style={tw("pb-4 pl-4")}>
            CUARTA.- Se solicita se acuerde como medida cautelar la suspensión
            de cualesquiera ejecuciones así como procedimientos declarativos
            instados contra mi representado, en aras a facilitar la protección
            del patrimonio de mi representado, tales como nóminas, saldos en
            cuentas bancarias fijados para alimentos, etc.
          </Text>
          <Text style={tw("pb-4 pl-4")}>
            QUINTA.- Se solicita se haga expreso pronunciamiento en el Auto de
            declaración de concurso de la imposibilidad a las entidades
            bancarias de bloqueo de cuentas en tanto que no se haya aceptado el
            cargo por el Administrador Concursal, habida cuenta que ello
            imposibilita la continuación de la subsistencia del deudor (tales
            como compras en supermercados, pagos correspondientes a la vivienda
            -alquiler-, pagos de pensiones de alimentos en favor de hijos, etc)
          </Text>
          <Text style={tw("pb-4 pl-4")}>
            SEXTA.- Solicitud EPI definitivo por insuficiencia de masa activa,
            siendo todos los créditos manifestados exonerables, salvo los
            privilegiados indicados al corriente de pago y los honorarios
            pendientes de pago de CORMEUM GLOBAL S.L., por lo que se SOLICITA
            que se declaren estos últimos como no exonerables.
          </Text>
        </View>

        <View style={tw("py-6")}>
          <Text style={tw("pb-2 font-bold text-gray-800 text-[13px]")}>
            PROCESOS JUDICIALES ABIERTOS
          </Text>
        </View>

        <View style={tw("py-6")}>
          <Text style={tw("pb-0")}>Lugar: {clientData.provincia}</Text>
          <Text style={tw("pb-0")}>
            Fecha: {formatDate(fecha, "medium", "es")}.
          </Text>
          <View style={tw("flex flex-row justify-between")}>
            <Text style={tw("pb-0")}>
              Firma Abogado: {abogado.name} {abogado.surname}
            </Text>
            <Text style={tw("pb-0")}>
              Firma procurador: {procurador.name} {procurador.surname}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  ).toBlob();

  return blob;
};

export default DemandaRendered;
