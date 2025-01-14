import React from "react";
import { useForm } from "react-hook-form";

const EmployeeForm = ({ setEmployees, employees }: any) => {
  type FormData = {
    name: string;
    surname: string;
    phone: string;
    email: string;
    salary: string;
  };
  const { register, handleSubmit, reset } = useForm<FormData>();
  const onSubmit = async (data: any) => {
    setEmployees([...employees, data]);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <div className="grid lg:grid-cols-6 gap-4 items-center ">
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          {...register("name", { required: true })}
          id="name"
          name="name"
          type="text"
          placeholder="Nombre"
        />
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          {...register("surname", { required: true })}
          type="text"
          id="surname"
          name="surname"
          placeholder="Apellido"
        />
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          {...register("phone", { required: true })}
          id="phone"
          name="phone"
          type="text"
          placeholder="Teléfono"
        />
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          {...register("email", { required: true })}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />

        <div className="relative rounded-md shadow-sm w-full">
          <input
            {...register("salary", { required: true })}
            id="salary"
            name="salary"
            type="number"
            className="block w-full rounded-md border-0 py-2 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-secondary sm:text-sm"
            placeholder="Salario mes"
            aria-describedby="price-currency"
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

export default EmployeeForm;
