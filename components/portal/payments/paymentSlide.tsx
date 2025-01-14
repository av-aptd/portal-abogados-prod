import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useUIStore } from "store/ui";
import { Bank, CheckFilled, Promo, Close, Bizum } from "components/icons";
import { useForm, Controller } from "react-hook-form";
import { usePortalStore } from "store/portal";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { Ring } from "@uiball/loaders";
import MiniLoading from "../miniLoading";
import { addManualPayment } from "apis/payments";
import clsx from "clsx";
import { useRouter } from "next/router";

const schema = z.object({
  ticket_type: z.number().optional(),
  assigned_to_user_id: z.number().optional(),
  assigned_to_group_id: z.number().optional(),
  title: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PaymentSlideOver = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const openNewPayment: any = useUIStore((state) => state.openNewPayment);
  const showNewPayment: any = useUIStore((state) => state.showNewPayment);
  const profile: any = usePortalStore((state) => state.profile);
  const [paymentMethod, setPaymentMethod] = useState<any>(
    "transferencia bancaria"
  );

  const closePaymentModal = () => {
    showNewPayment();
    reset();
  };

  const mutation = useMutation({
    mutationFn: async (body: any) => addManualPayment(profile.token, body),
    onSuccess: async () => {
      showNewPayment();
      queryClient.invalidateQueries(["userPayments"]);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const body = {
      amount: data.amount,
      clientId: router.query.id,
      paymentDate: data.paymentDate,
      paymentMethod: paymentMethod,
    };
    mutation.mutate(body);
  };

  return (
    <Transition.Root show={openNewPayment} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={showNewPayment}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-primary py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Nuevo pago
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-primary text-indigo-200 hover:text-white focus:outline-none"
                              onClick={() => showNewPayment()}
                            >
                              <span className="sr-only">Close panel</span>
                              <Close className="h-8 w-8" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-white/60">
                            A continuación rellena la siguiente información de
                            la incidencia.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            <div className="grid sm:grid-cols-3 gap-4">
                              <div
                                className={clsx(
                                  paymentMethod == "transferencia bancaria"
                                    ? "border-secondary"
                                    : "",
                                  "border-2 bg-gray-50 px-2 py-4 rounded-lg text-center relative cursor-pointer"
                                )}
                                onClick={() =>
                                  setPaymentMethod("transferencia bancaria")
                                }
                              >
                                <Bank className="w-8 h-8 mx-auto text-gray-500" />
                                <p className="text-gray-500 font-medium pt-2 text-xs">
                                  Transferencia
                                </p>
                                {paymentMethod == "transferencia bancaria" && (
                                  <CheckFilled className="w-4 h-4 mx-auto text-secondary absolute top-1.5 right-1.5" />
                                )}
                              </div>
                              <div
                                className={clsx(
                                  paymentMethod == "Paycomet - Bizum"
                                    ? "border-secondary"
                                    : "",
                                  "border-2 bg-gray-50 px-2 py-4 rounded-lg text-center relative cursor-pointer"
                                )}
                                onClick={() =>
                                  setPaymentMethod("Paycomet - Bizum")
                                }
                              >
                                <div className="ml-3">
                                  <Bizum className="w-8 h-8 text-gray-500 mx-auto" />
                                </div>

                                <p className="text-gray-500 font-medium pt-2 text-xs">
                                  Bizum
                                </p>
                                {paymentMethod == "Paycomet - Bizum" && (
                                  <CheckFilled className="w-4 h-4 mx-auto text-secondary absolute top-1.5 right-1.5" />
                                )}
                              </div>
                              <div
                                className={clsx(
                                  paymentMethod == "promo"
                                    ? "border-secondary"
                                    : "",
                                  "border-2 bg-gray-50 px-2 py-4 rounded-lg text-center relative cursor-pointer"
                                )}
                                onClick={() => setPaymentMethod("promo")}
                              >
                                <Promo className="w-8 h-8 mx-auto text-gray-500" />
                                <p className="text-gray-500 font-medium pt-2 text-xs">
                                  Promoción
                                </p>
                                {paymentMethod == "promo" && (
                                  <CheckFilled className="w-4 h-4 mx-auto text-secondary absolute top-1.5 right-1.5" />
                                )}
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="paymentDate"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Fecha de pago
                              </label>

                              <div className="mt-1">
                                <Controller
                                  control={control}
                                  name="paymentDate"
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <DatePicker
                                      locale="es"
                                      dateFormat="P"
                                      placeholderText="Seleccionar fecha de pago"
                                      onChange={(date) => field.onChange(date)}
                                      selected={field.value}
                                      className={clsx(
                                        errors.paymentDate
                                          ? "border-red-400"
                                          : "border-gray-300",
                                        "block w-full rounded-md  py-2 text-sm px-4 shadow-sm focus:border-secondary focus:ring-secondary"
                                      )}
                                    />
                                  )}
                                />
                                {errors.paymentDate && (
                                  <p className="text-red-400 text-sm px-2 pt-1">
                                    Seleccionar fecha de pago
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="amount"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Importe a ingresar
                              </label>

                              <div className="relative mt-1 rounded-md shadow-sm">
                                <input
                                  {...register("amount", { required: true })}
                                  type="text"
                                  name="amount"
                                  id="amount"
                                  className={clsx(
                                    errors.paymentDate
                                      ? "border-red-400"
                                      : "border-gray-300",
                                    "block w-full rounded-md border-gray-300 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                                  )}
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span
                                    className="text-gray-500 sm:text-sm"
                                    id="price-currency"
                                  >
                                    €
                                  </span>
                                </div>
                              </div>
                              {errors.amount && (
                                <p className="text-red-400 text-sm px-2 pt-1">
                                  Ingresa un importe
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-shrink-0 justify-start lg:justify-end px-4 py-4 space-x-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                        onClick={() => closePaymentModal()}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary px-8 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
                      >
                        {mutation.isLoading ? (
                          <MiniLoading size={14} color="#fff" />
                        ) : (
                          "Hacer pago"
                        )}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PaymentSlideOver;
