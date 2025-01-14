import React from "react";
import { useForm } from "react-hook-form";

const PersonForm = ({ setPeople, people }: any) => {
  type FormData = {
    name: string;
    surname: string;
    age: string;
  };
  const { register, handleSubmit, reset } = useForm<FormData>();
  const onSubmit = async (data: any) => {
    setPeople([...people, data]);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <div className="grid lg:grid-cols-6 gap-4 items-center ">
        <div className="lg:col-span-2">
          <input
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
            {...register("name")}
            id="name"
            name="name"
            type="text"
            placeholder="Nombre"
          />
        </div>
        <div className="lg:col-span-2">
          <input
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
            {...register("surname")}
            type="text"
            id="surname"
            name="surname"
            placeholder="Apellido"
          />
        </div>
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
          {...register("age")}
          id="age"
          name="age"
          type="text"
          placeholder="Años"
        />

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

export default PersonForm;
