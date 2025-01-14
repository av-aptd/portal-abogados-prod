import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useUIStore } from "store/ui";
import shallow from "zustand/shallow";
import { useMutation } from "@tanstack/react-query";
import { getSettings } from "shared/helpers";
import Link from "next/link";
import { usePortalStore } from "store/portal";
import { EyeClosed, EyeOpened } from "./icons";

import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(8, { message: "Contraseña mínima 8 caracteres" }),
  })
  .required();

type formData = z.infer<typeof schema>;

const PasswordForm = () => {
  const urlParams = usePortalStore((state) => state.urlParams);
  const [passOpened, setPassOpened] = useState(false);

  const mutation = useMutation({
    mutationFn: async (password) =>
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/auth/change-password?${
          urlParams + "&password=" + password
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      ),
    onSuccess: async (data) => setInformation(data),
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: any) => {
    mutation.mutate(data.password);
  };

  const setInformation = async (data: any) => {
    console.log(data);
    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Nueva contraseña
        </label>
        <div className="mt-1">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              {...register("password")}
              id="password"
              name="password"
              type={passOpened ? "text" : "password"}
              autoComplete="current-password"
              className={clsx(
                errors.password ? "border-red-400" : "border-gray-300",
                "block w-full rounded-none rounded-l-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              )}
            />
            <button
              type="button"
              onClick={() => {
                setPassOpened(!passOpened);
              }}
              className="relative bg-gray-50 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {passOpened ? (
                <EyeClosed
                  className="-ml-0.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                <EyeOpened
                  className="-ml-0.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-400 text-sm pt-1 pl-2">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 flex-col space-y-4">
        <button
          disabled={mutation.isLoading}
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
        >
          {mutation.isLoading
            ? "Cargando..."
            : router.pathname === "/cambiar-password"
            ? "Cambiar contraseña"
            : "Nueva contraseña"}
        </button>
        {router.pathname === "/cambiar-password" && (
          <Link
            href="/"
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-gray-50 py-3 sm:py-2.5 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 duration-300"
          >
            Volver
          </Link>
        )}
      </div>
    </form>
  );
};

export default PasswordForm;
