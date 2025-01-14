import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Help, Close } from "components/icons";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("es", es);
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { usePreguntasStore } from "store/preguntas";
import { useUIStore } from "store/ui";

const adquisicion = [
  `<p>Indica la fecha de matriculación del vehículo. Puedes revisar esta información en el Permiso de Circulación (cartulina verde que solemos tener en el coche) o en la Ficha Técnica.</p>
`,
];

const reserva = [
  `<p>La reserva de dominio es una cláusula que se incluye en algunas financiaciones de vehículos. Esta cláusula permite al vendedor mantener la propiedad del vehículo hasta que no se haya completado el pago de todas las cuotas acordadas.</p>
  <p>Si no sabes si tu financiación del vehículo tiene reserva de dominio, puedes revisarlo en el Contrato de Compraventa.</p>
  <p>Marca SI en caso de tener un financiación del vehículo con esta cláusula, esté o no al corriente de pago. En tal caso, añade la entidad con la que tienes esta financiación.</p>
  <p>Marca NO si tu vehículo no tiene ninguna financiación o si la financiación no incluye reserva de dominio.</p>
`,
];

const CarModal = ({ name, setUserActivos, userActivos }: any) => {
  const openModal: any = usePreguntasStore((state) => state.openModal);
  const showModal: any = usePreguntasStore((state) => state.showModal);

  const schema = z.object({
    brandVehicle: z.string().min(1),
    modelVehicle: z.string().min(1),
    licensePlate: z.string().min(1),
    acquisitionDate: z.date(),
    valorAdquisicion: z.string().min(1),
    valorMercado: z.string().min(1),
    reservationTitle: z.string({
      invalid_type_error: "Por favor selecciona una opción",
    }),
  });

  type FormData = z.infer<typeof schema>;

  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);

  const setHelpMessage = (question: any) => {
    setHelp(question);
    showHelpModal();
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: any) => {
    console.log(data);

    setUserActivos([
      ...userActivos,
      {
        naturaleza: "Bien mueble",
        name,
        ...{
          brandVehicle: data.brandVehicle,
          modelVehicle: data.modelVehicle,
          licensePlate: data.licensePlate,
          acquisitionDate: data.acquisitionDate,
          valorAdquisicion: data.valorAdquisicion,
          valorMercado: data.valorMercado,
          reservationTitle: data.reservationTitle,
        },
      },
    ]);

    showModal();
    reset();
  };

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={showModal}>
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
                  <div>
                    <label
                      htmlFor="brandVehicle"
                      className="block text-sm font-medium text-gray-900"
                    >
                      ¿Qué marca es?
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("brandVehicle")}
                      id="brandVehicle"
                      name="brandVehicle"
                      type="text"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="modelVehicle"
                      className="block text-sm font-medium text-gray-900"
                    >
                      ¿Qué modelo es?
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("modelVehicle")}
                      id="modelVehicle"
                      name="modelVehicle"
                      type="text"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="licensePlate"
                      className="block text-sm font-medium text-gray-900"
                    >
                      ¿Cuál es el número de matrícula?
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("licensePlate")}
                      id="licensePlate"
                      name="licensePlate"
                      type="text"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="acquisitionDate"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      ¿Cuál es la fecha de adquisición?
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(adquisicion)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <div className="mt-1">
                      <Controller
                        control={control}
                        name="acquisitionDate"
                        render={({ field }) => (
                          <DatePicker
                            locale="es"
                            dateFormat="P"
                            placeholderText="Seleccionar fecha"
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                            className="block w-full rounded-md border-gray-300 py-2 px-4 text-sm shadow-sm focus:border-secondary focus:ring-secondary "
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="valorAdquisicion"
                      className="block text-sm font-medium text-gray-900"
                    >
                      ¿Cuál es el valor de adquisición?
                    </label>

                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                      {...register("valorAdquisicion")}
                      type="text"
                      id="valorAdquisicion"
                      name="valorAdquisicion"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="valorMercado"
                      className="block text-sm font-medium text-gray-900"
                    >
                      ¿Cuál es el valor de mercado?
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
                      htmlFor="reservationTitle.big"
                      className="flex text-sm font-medium text-gray-900"
                    >
                      ¿tiene reserva de dominio?
                      <button
                        className="pl-2 text-gray-500 flex justify-center items-center"
                        onClick={() => setHelpMessage(reserva)}
                      >
                        <Help className="w-5 h-5 text-gray-500 inline-block shrink-0" />
                      </button>
                    </label>
                    <div className="mt-4 flex items-center">
                      <input
                        {...register("reservationTitle")}
                        type="radio"
                        value="yes"
                        name="reservationTitle"
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="reservationTitle"
                        className="ml-3 block text-sm text-gray-500"
                      >
                        Sí
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        {...register("reservationTitle")}
                        type="radio"
                        value="no"
                        name="reservationTitle"
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="reservationTitle"
                        className="ml-3 block text-sm text-gray-500"
                      >
                        No
                      </label>
                      {errors.reservationTitle && <></>}
                    </div>
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

export default CarModal;
