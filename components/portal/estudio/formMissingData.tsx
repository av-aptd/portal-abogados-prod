import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useEstudioStore } from "store/estudio";
import { useUIStore } from "store/ui";

const FormMissingData = () => {
  const setLead = useEstudioStore((state) => state.setLead);
  const lead = useEstudioStore((state) => state.lead);
  const showModalExtended: any = useUIStore((state) => state.showModalExtended);
  const type = useEstudioStore((state) => state.type);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (type === "LSO" || type === "LSO-UF") {
      setLead({ ...lead, ...{ dni: data.dni } });
    }

    if (type === "EXPRESS") {
      setLead({
        ...lead,
        ...{
          dni: data.dni,
          businessName: data.businessName,
          businessCIF: data.businessCIF,
          businessAddress: data.businessAddress,
        },
      });
    }

    await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/leads/${lead.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ ...lead, dni: data.dni }),
    });

    showModalExtended();
    router.push("/planes");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="dni"
          className="block text-sm font-medium text-gray-700"
        >
          DNI
        </label>
        <div className="mt-1">
          <input
            {...register("dni", { required: true })}
            id="dni"
            name="dni"
            type="text"
            className={clsx(
              "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
            )}
          />
        </div>
      </div>
      {type === "EXPRESS" && (
        <>
          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-gray-700"
            >
              Razón social
            </label>
            <div className="mt-1">
              <input
                {...register("businessName", { required: true })}
                id="businessName"
                name="businessName"
                type="text"
                className={clsx(
                  "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                )}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="businessCIF"
              className="block text-sm font-medium text-gray-700"
            >
              CIF
            </label>
            <div className="mt-1">
              <input
                {...register("businessCIF", { required: true })}
                id="businessCIF"
                name="businessCIF"
                type="text"
                className={clsx(
                  "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                )}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="businessAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección fiscal
            </label>
            <div className="mt-1">
              <input
                {...register("businessAddress", { required: true })}
                id="businessAddress"
                name="businessAddress"
                type="text"
                className={clsx(
                  "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                )}
              />
            </div>
          </div>
        </>
      )}

      <div className="pt-4">
        <button
          //   disabled={mutation.isLoading}
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
        >
          Continuar
        </button>
      </div>
    </form>
  );
};

export default FormMissingData;
