import { Fragment, use, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { usePortalStore } from "store/portal";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserCreditor, getCreditors, getDebTypes } from "apis/creditors";
import { Close } from "components/icons";
import { useUIStore } from "store/ui";
import { Ring } from "@uiball/loaders";

const judicializedDebts = [
  {
    name: "Sí",
    value: "yes",
  },
  {
    name: "No",
    value: "no",
  },
];

const schema = z.object({
  creditorId: z.string(),
  typeOfDebt: z.string(),
  contractAmount: z
    .number({ invalid_type_error: "El importe debe ser un número" })
    .min(0.01, { message: "El importe debe ser mayor de 0" }),
  judicializedDebt: z.string({
    invalid_type_error: "Por favor selecciona una opción",
  }),
  isSeized: z.string().optional(),
  courtName: z.string().optional(),
  procedureNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function NewUserCreditorForm() {
  const [expirationDate, setExpirationDate] = useState(new Date());
  const profile = usePortalStore((state) => state.profile);
  const showNewCreditor: any = useUIStore((state) => state.showNewCreditor);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { data: creditors } = useQuery({
    queryKey: ["creditors"],
    queryFn: getCreditors,
  });

  const { data: debTypes } = useQuery({
    queryKey: ["debTypes"],
    queryFn: getDebTypes,
  });

  const watchFields = watch(["judicializedDebt", "isSeized"]);

  const getCreditorInfo = (creditorId: string) => {
    const creditor = creditors.find(
      (creditor: any) => creditor.id === Number(creditorId)
    );
    return creditor;
  };

  const mutation = useMutation((body: any) => addUserCreditor(body), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creditors"] });
      queryClient.invalidateQueries({ queryKey: ["userCreditors"] });

      reset();
      showNewCreditor();
    },
  });

  const onSubmit = async (data: any) => {
    const creditorInfo = getCreditorInfo(data.creditorId);

    const body = {
      clientId: profile.id,
      creditorName: creditorInfo.name,
      creditorLocation: creditorInfo.location,
      creditorEmail: creditorInfo.email,
      creditorPhoneNumber: creditorInfo.phonenumber,
      contractAmount: data.contractAmount,
      typeOfDebt: data.typeOfDebt,
      expirationDate,
      debtStatus:
        data.judicializedDebt == "yes"
          ? "Deuda judicializada"
          : "Deuda no judicializada",
      stage: data.isSeized == "yes" ? "Etapa ejecutiva" : "Etapa declarativa",
      courtName: data.courtName,
      procedureNumber: data.procedureNumber,
    };

    mutation.mutate(body);
  };

  const closeCreditorModal = () => {
    showNewCreditor(false);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
    >
      <div className="h-0 flex-1 overflow-y-auto">
        <div className="bg-primary py-6 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-white">
              Nuevo acreedor
            </Dialog.Title>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="rounded-md bg-primary text-indigo-200 hover:text-white focus:outline-none"
                onClick={() => showNewCreditor(false)}
              >
                <span className="sr-only">Close panel</span>
                <Close className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-1">
            <p className="text-sm text-white/60">
              A continuación rellena la siguiente información de tu acreedor.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="divide-y divide-gray-200 px-4 sm:px-6">
            <div className="space-y-6 pt-6 pb-5">
              <div>
                <label
                  htmlFor="creditorId"
                  className="block text-sm font-medium text-gray-900"
                >
                  Nombre del acreedor
                </label>
                <select
                  {...register("creditorId")}
                  id="creditorId"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                >
                  {creditors?.map((creditor: any) => (
                    <option key={creditor.id} value={creditor.id}>
                      {creditor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="typeOfDebt"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo de deuda
                </label>
                <select
                  {...register("typeOfDebt")}
                  id="typeOfDebt"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                >
                  {debTypes?.map((debType: any) => (
                    <option key={debType.value} value={debType.value}>
                      {debType.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contractAmount"
                  className="block text-sm font-medium text-gray-900"
                >
                  Importe de la deuda
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    {...register("contractAmount", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    id="contractAmount"
                    className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                    placeholder="0,00"
                    aria-describedby="price-currency"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      EUR
                    </span>
                  </div>
                </div>
                {errors.contractAmount && (
                  <p className="text-red-400 text-sm pt-1 pl-2">
                    {errors.contractAmount.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="expirationDate"
                  className="block text-sm font-medium text-gray-900"
                >
                  Vencimiento
                </label>
                <div className="mt-1">
                  <DatePicker
                    locale="es"
                    dateFormat="P"
                    selected={expirationDate}
                    onChange={(date: Date) => setExpirationDate(date)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                  />
                </div>
              </div>
              <fieldset>
                <legend className="text-sm font-medium text-gray-900">
                  ¿La deuda está judicializada?
                </legend>
                <div className="mt-2 space-y-1">
                  {judicializedDebts?.map((judicializedDebt: any) => (
                    <div
                      className="relative flex items-start"
                      key={judicializedDebt.value}
                    >
                      <div className="absolute flex h-5 items-center">
                        <input
                          {...register("judicializedDebt")}
                          type="radio"
                          name="judicializedDebt"
                          className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                          value={judicializedDebt.value}
                        />
                      </div>
                      <div className="pl-7 text-sm">
                        <label
                          htmlFor="judicializedDebt-yes"
                          className="text-gray-500"
                        >
                          {judicializedDebt.name}
                        </label>
                      </div>
                    </div>
                  ))}

                  {errors.judicializedDebt && (
                    <p className="text-red-400 text-sm pt-1 pl-2">
                      {errors.judicializedDebt.message}
                    </p>
                  )}
                </div>
              </fieldset>
              {watchFields[0] == "yes" && (
                <fieldset>
                  <legend className="text-sm font-medium text-gray-900">
                    ¿Te han embargado?
                  </legend>
                  <div className="mt-2 space-y-1">
                    <div className="relative flex items-start">
                      <div className="absolute flex h-5 items-center">
                        <input
                          {...register("isSeized")}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                          value="yes"
                        />
                      </div>
                      <div className="pl-7 text-sm">
                        <label
                          htmlFor="privacy-public"
                          className="text-gray-500"
                        >
                          Sí
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className="relative flex items-start">
                        <div className="absolute flex h-5 items-center">
                          <input
                            {...register("isSeized")}
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                            value="no"
                          />
                        </div>
                        <div className="pl-7 text-sm">
                          <label
                            htmlFor="privacy-private-to-project"
                            className="text-gray-500"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              )}

              {watchFields[0] == "yes" &&
                (watchFields[1] == "yes" || watchFields[1] == "no") && (
                  <>
                    <div>
                      <label
                        htmlFor="courtName"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Número y localidad del juzgado
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                          {...register("courtName")}
                          type="text"
                          id="courtName"
                          className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                          placeholder="Juzgado"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="procedureNumber"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Número de procedimiento
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                          {...register("procedureNumber")}
                          type="text"
                          id="procedureNumber"
                          className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                          placeholder="Procedimiento"
                        />
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 justify-start lg:justify-end px-4 py-4">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
          onClick={() => closeCreditorModal()}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
        >
          {mutation.isLoading ? <Ring size={20} color="#fff" /> : "Añadir"}
        </button>
      </div>
    </form>
  );
}

export default NewUserCreditorForm;
