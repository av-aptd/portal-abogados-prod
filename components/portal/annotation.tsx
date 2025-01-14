import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import React, { use } from "react";
import { useForm } from "react-hook-form";

const AnnotationsBloc = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data: any) => console.log(data),
  });

  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="mt-1">
        <textarea
          {...register("message", { required: true })}
          spellCheck="true"
          id="message"
          name="message"
          className={clsx(
            "block w-full appearance-none border-gray-300 rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
          )}
        />
      </div>

      <div className="">
        <button
          disabled={mutation.isLoading}
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
        >
          {mutation.isLoading ? "Añadir..." : "Añadir anotación"}
        </button>
      </div>
    </form>
  );
};

export default AnnotationsBloc;
