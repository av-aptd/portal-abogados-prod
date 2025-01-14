import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePortalStore } from "../store/portal";
import clsx from "clsx";
import { useUIStore } from "store/ui";
import shallow from "zustand/shallow";
import { usePreguntasStore } from "store/preguntas";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { EyeClosed, EyeOpened } from "./icons";
import { logUser } from "apis/auth";
import { useRouter } from "next/navigation";
import { Ring } from "@uiball/loaders";
import Cookies from "js-cookie";

const LoginForm = () => {
  const setProfile = usePortalStore((state) => state.setProfile);
  const setUserId = usePreguntasStore((state) => state.setUserId);
  const setToken = usePreguntasStore((state) => state.setToken);
  const router = useRouter();
  const [passOpened, setPassOpened] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => logUser(data),
    onSuccess: async (data) => setInformation(data),
  });

  const { showModal, setInfo } = useUIStore(
    (state) => ({
      showModal: state.showModal,
      setInfo: state.setInfo,
    }),
    shallow
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };

  const setInformation = async (data: any) => {
    const info = await data.json();

    if (info.status === 401) {
      setInfo({
        title: "Error de acceso",
        message: "Las credenciales introducidas son incorrectas.",
        icon: "bad",
        textButton: "Cerrar",
        type: "alert",
      });
      showModal();
    } else {
      window.localStorage.setItem("@UserToken", String(info.token));
      Cookies.set("token", String(info.token), { expires: 7 });

      setProfile({
        AuthId: info.user.AuthId,
        email: info.user.emailaddress,
        name: info.user.name,
        isActive: info.user.isactive,
        groups: info.groups,
        token: info.token,
        id: info.user.id,
        roleId: info.user.roleId,
        role_name: info.user.role_name,
      });
      setUserId(info.user.id);
      setToken(info.token);
      router.push("/portal");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            {...register("email", { required: true })}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={clsx(
              errors.email?.type === "required"
                ? "border-red-400"
                : "border-gray-300",
              "block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
            )}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-400 text-sm pt-1 pl-2">Email obligatorio</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Contraseña
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              {...register("password", { required: true })}
              id="password"
              name="password"
              type={passOpened ? "text" : "password"}
              autoComplete="current-password"
              className={clsx(
                errors.password?.type === "required"
                  ? "border-red-400"
                  : "border-gray-300",
                "block w-full rounded-none rounded-l-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              )}
            />
          </div>
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
      </div>

      <div className="flex justify-end">
        <div className="text-sm">
          <Link
            href="/password-olvidado"
            className="font-medium text-secondary hover:text-secondary"
          >
            ¿Contraseña olvidada?
          </Link>
        </div>
      </div>

      <div className="pt-4">
        <button
          disabled={mutation.isLoading}
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
        >
          {mutation.isLoading ? <Ring size={20} color="#fff" /> : "Entrar"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
