import React from "react";
import { useForm } from "react-hook-form";

const ButtonBloc = ({ setComponents, setCurrentComponent }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    setComponents((components: any) => [
      ...components,
      {
        componentType: "button",
        label: data.label,
        url: data.url,
      },
    ]);
    reset();
    setCurrentComponent(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="label"
            className="block text-sm font-medium text-gray-700"
          >
            Etiqueta botón
          </label>
          <div className="mt-1">
            <input
              {...register("label", { required: true })}
              id="label"
              name="label"
              type="text"
              className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Dirección URL
          </label>
          <div className="mt-1">
            <input
              {...register("url", { required: true })}
              id="url"
              name="url"
              type="text"
              className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-gray-400 py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
        >
          guardar
        </button>
      </form>
    </div>
  );
};

export default ButtonBloc;
