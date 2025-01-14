import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Help, Close } from "components/icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePreguntasStore } from "store/preguntas";
import { useUIStore } from "store/ui";

const tipoInmueble = [
  `<p><strong>FINCA URBANA</strong> es aquella en la que se puede edificar. Las viviendas y locales comerciales son fincas urbanas.</p>
  <p><strong>FINCA RÚSTICA</strong> es aquella en la que no se puede edificar. Habitualmente se usa como explotación agraria o forestal.</p>
`,
];

const porcentaje = [
  `<p>Si eres el titular único del inmueble, indica el 100%.</p>
  <p>Si compartes la titularidad del inmueble, indica qué porcentaje tienes.</p>
  <p>Si no sabes qué porcentaje tienes, puedes revisarlo en la Escritura de Compraventa, documento que te dieron al firmar en notaría. Si no tienes este documento, puedes solicitar una copia ante el mismo notario.</p>
`,
];

const valorCatastral = [
  `
  <p>El valor de adquisición es el precio por el que adquiriste el inmueble. Es decir, el valor por el que compraste el inmueble en su momento.</p>
  <p>Es importante tener en cuenta que el valor de adquisición no es el valor actual del inmueble, ya que este puede haber variado con el tiempo.</p> 
  <p>Si no recuerdas el valor de adquisición, puedes revisarlo en la Escritura de Compraventa, documento que recibiste al firmar con el Notario.</p>`,
];

const valorMercado = [
  `<p>El valor de mercado es el precio que tiene tu inmueble actualmente. Indica el valor aproximado.</p>
  <p>Si no sabes qué valor de mercado tiene, puedes consultar los precios de venta de propiedades similares en tu zona.</p>
  <p>También existen herramientas online que te permiten hacer una estimación gratuita según las características y la ubicación de tu inmueble.</p>`,
];

const gravadaHipoteca = [
  `<p>Marca <strong>SI</strong> en caso de tener una hipoteca pendiente de pago en relación a este inmueble, tanto si está al corriente de pago como si no.</p>
  <p>Marca <strong>NO</strong> en caso de que este inmueble no tenga asociada ninguna hipoteca.</p>`,
];

const entidadFinanciera = [
  `<p>Indica con qué entidad financiera tienes la hipoteca de este inmueble. Puedes revisar de qué entidad se trata en la Escritura de Compraventa o en cualquier recibo.</p>`,
];

const cuotas = [
  `
<p>Las cuotas de la comunidad son los pagos que los propietarios de un piso deben hacer a la comunidad de propietarios para cubrir los gastos comunes del edificio.</p>
<p>Indica si estás al corriente de pago de estas cuotas y no tienes ninguna deuda pendiente con la comunidad de vecinos.</p>`,
];

const impuestos = [
  `
<p>Los impuestos relativos a la vivienda son aquellos que debes abonar a la Administración Pública. El principal impuesto es el IBI, que debes abonar anualmente.</p>
<p>Indica si estás al corriente de pago de estos impuestos y no tienes ninguna deuda pendiente.</p>`,
];

const registro = [
  `
<p>Esta información puede aparecer como Anexo en la Escritura de Compraventa que firmaste ante notario.</p>
<p>También puedes obtener esta información solicitando la Nota Simple en la página web de Registradores de España.</p>
<p>Haz click en este enlace para solicitarla. <a target="_blank" rel="noopener" href="https://sede.registradores.org/site/home">Acceder registro</a> También puedes consultar en nuestro Centro de Ayuda cómo solicitarla paso a paso.</p>`,
];

const InmuebleModal = ({ name, setUserActivos, userActivos }: any) => {
  const openModal: any = usePreguntasStore((state) => state.openModal);
  const showModal: any = usePreguntasStore((state) => state.showModal);
  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);

  const schema = z.object({
    tipoInmueble: z.string().min(2),
    porcentaje: z.string().min(1),
    valorCatastral: z.string().min(1),
    valorMercado: z.string().min(1),
    gravadaHipoteca: z.string(),
    entidadFinanciera: z.string().min(1),
    corrientePagoComunidad: z.string(),
    corrienteImpuestosVivienda: z.string(),
    numInscripcion: z.string().min(1),
    provincia: z.string().min(1),
    numLibro: z.string().min(1),
    folio: z.string().min(1),
    tomo: z.string().min(1),
    numFinca: z.string().min(1),
  });

  type FormData = z.infer<typeof schema>;

  const setHelpMessage = (question: any) => {
    setHelp(question);
    showHelpModal();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: any) => {
    setUserActivos([
      ...userActivos,
      {
        naturaleza: "Bien Inmueble",
        name,
        ...{
          tipoInmueble: data.tipoInmueble,
          porcentaje: data.porcentaje,
          valorCatastral: data.valorCatastral,
          valorMercado: data.valorMercado,
          gravadaHipoteca: data.gravadaHipoteca,
          entidadFinanciera: data.entidadFinanciera,
          corrientePagoComunidad: data.corrientePagoComunidad,
          corrienteImpuestosVivienda: data.corrienteImpuestosVivienda,
          numInscripcion: data.numInscripcion,
          provincia: data.provincia,
          numLibro: data.numLibro,
          folio: data.folio,
          tomo: data.tomo,
          numFinca: data.numFinca,
        },
      },
    ]);
    reset();
    showModal();
  };

  const inmuebles = [
    { name: "Urbana", value: "urbana" },
    { name: "Rústica", value: "rustica" },
    { name: "Otro", value: "otro" },
  ];

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="pt-3 flex-1 text-xl font-bold pl-4">
                    {name}
                  </div>
                  <button onClick={() => showModal()}>
                    <Close className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-8 grid lg:grid-cols-3 gap-8 p-4 mb-4 rounded-lg"
                >
                  <div className="">
                    <div className="">
                      <label
                        htmlFor="tipoInmueble"
                        className="flex items-center text-sm font-medium text-gray-900"
                      >
                        Elige el tipo de inmueble
                        <button
                          className="pl-2 text-gray-500 flex justify-center items-center"
                          onClick={() => setHelpMessage(tipoInmueble)}
                        >
                          <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                        </button>
                      </label>
                      <select
                        {...register("tipoInmueble")}
                        id="tipoInmueble"
                        name="tipoInmueble"
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      >
                        <option value="">Seleccionar</option>
                        {inmuebles.map((inmueble: any) => (
                          <option key={inmueble.value} value={inmueble.value}>
                            {inmueble.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="porcentaje"
                      className="flex items-center text-sm font-medium text-gray-900"
                    >
                      Indica el % que posees
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(porcentaje)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("porcentaje")}
                      id="porcentaje"
                      name="porcentaje"
                      type="text"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="valorCatastral"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      Valor catastral
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(valorCatastral)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>

                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("valorCatastral")}
                      type="text"
                      id="valorCatastral"
                      name="valorCatastral"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="valorMercado"
                      className="flex items-center text-sm font-medium text-gray-900"
                    >
                      Valor de mercado
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(valorMercado)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>

                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("valorMercado")}
                      type="text"
                      id="valorMercado"
                      name="valorMercado"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gravadaHipoteca"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      ¿Está gravada con hipoteca?
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(gravadaHipoteca)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <div className="mt-4 flex items-center">
                      <input
                        {...register("gravadaHipoteca")}
                        type="radio"
                        value="yes"
                        name="gravadaHipoteca"
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="gravadaHipoteca"
                        className="ml-3 block text-sm text-gray-500"
                      >
                        Sí
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        {...register("gravadaHipoteca")}
                        type="radio"
                        value="no"
                        name="gravadaHipoteca"
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="gravadaHipoteca"
                        className="ml-3 block text-sm text-gray-500"
                      >
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="entidadFinanciera"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      Entidad financiera
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(entidadFinanciera)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>

                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("entidadFinanciera")}
                      type="text"
                      id="entidadFinanciera"
                      name="entidadFinanciera"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="corrientePagoComunidad"
                      className="flex items-start text-sm font-medium text-gray-900"
                    >
                      ¿Estás al corriente de pago de las cuotas de comunidad?
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(cuotas)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <div className="mt-4 flex items-center">
                      <input
                        {...register("corrientePagoComunidad")}
                        type="radio"
                        value="yes"
                        name="corrientePagoComunidad"
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="corriente-si"
                        className="ml-3 block text-sm text-gray-500"
                      >
                        Sí
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        {...register("corrientePagoComunidad")}
                        type="radio"
                        value="no"
                        name="corrientePagoComunidad"
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="corriente-no"
                        className="ml-3 block text-sm text-gray-500"
                      >
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="corrienteImpuestosVivienda"
                      className="flex items-start text-sm font-medium text-gray-900"
                    >
                      ¿Estás al corriente de pago en los impuestos que gravan la
                      vivienda?
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(impuestos)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <div className="mt-4 flex items-center">
                      <input
                        {...register("corrienteImpuestosVivienda")}
                        type="radio"
                        value="yes"
                        name="corrienteImpuestosVivienda"
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="impuesto-si"
                        className="ml-3 block text-sm text-gray-500"
                      >
                        Sí
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        {...register("corrienteImpuestosVivienda")}
                        type="radio"
                        value="no"
                        name="corrienteImpuestosVivienda"
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="impuesto-no"
                        className="ml-3 block text-sm text-gray-500"
                      >
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="numInscripcion"
                      className="flex items-start text-sm font-medium text-gray-900"
                    >
                      Núm. inscripción en el registro de la propiedad
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(registro)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("numInscripcion")}
                      id="numInscripcion"
                      name="numInscripcion"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="provincia"
                      className="flex items-center text-sm font-medium text-gray-900"
                    >
                      Provincia
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(registro)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("provincia")}
                      id="provincia"
                      name="provincia"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="numLibro"
                      className="flex items-center text-sm font-medium text-gray-900"
                    >
                      Número de libro
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(registro)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("numLibro")}
                      id="numLibro"
                      name="numLibro"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="folio"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      Folio
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(registro)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("folio")}
                      id="folio"
                      name="folio"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tomo"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      Tomo
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(registro)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("tomo")}
                      id="tomo"
                      name="tomo"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="numFinca"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      Número de finca
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(registro)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("numFinca")}
                      id="numFinca"
                      name="numFinca"
                      type="text"
                    />
                  </div>

                  <div className="lg:col-span-3">
                    <div>
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none sm:text-sm"
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default InmuebleModal;
