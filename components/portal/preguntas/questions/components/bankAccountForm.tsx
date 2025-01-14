import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty(),
  iban: z.string().nonempty(),
  balance: z.number().nonnegative(),
});

type FormData = z.infer<typeof schema>;

const BankAccountForm = ({ setBankAccounts, bankAccounts }: any) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: any) => {
    setBankAccounts([...bankAccounts, data]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <div className="grid lg:grid-cols-6 gap-4 items-center ">
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          {...register("name")}
          type="text"
          placeholder="Nombre banco"
        />
        <div className="lg:col-span-3">
          <input
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
            {...register("iban")}
            type="text"
            placeholder="IBAN"
          />
        </div>
        <div className="relative rounded-md shadow-sm">
          <input
            className="block w-full rounded-md border-gray-300 pl-3 pr-8 focus:border-secondary focus:ring-secondary sm:text-sm"
            {...register("balance", { valueAsNumber: true })}
            type="number"
            placeholder="Saldo"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm" id="price-currency">
              €
            </span>
          </div>
        </div>

        <div className="">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none sm:text-sm"
          >
            Añadir
          </button>
        </div>
      </div>
    </form>
  );
};

export default BankAccountForm;
