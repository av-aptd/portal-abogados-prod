import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useUIStore } from "store/ui";
import shallow from "zustand/shallow";
import Cookies from "js-cookie";
import Link from "next/link";
import { Ring } from "@uiball/loaders";
import {
  changePassword,
  changePasswordWithCode,
  getVerificationCode,
  verifyPhoneCode,
} from "apis/auth";
import { ModalExtended } from "./portal/estudio/modalExtended";
import { Envelope, SMS } from "./icons";
import { usePortalStore } from "store/portal";
import { usePreguntasStore } from "store/preguntas";
import { EyeClosed, EyeOpened } from "./icons";

const NewPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [source, setSource] = useState<any>("email");
  const [code, setCode] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [password2, setPassword2] = useState<any>("");
  const [error, setError] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const setProfile = usePortalStore((state) => state.setProfile);
  const setUserId = usePreguntasStore((state) => state.setUserId);
  const setToken = usePreguntasStore((state) => state.setToken);
  const [emailExists, setEmailExists] = useState<boolean>(true);

  const [passOpened, setPassOpened] = useState(false);
  const [passOpened2, setPassOpened2] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { showModal, setInfo, showModalExtended } = useUIStore(
    (state) => ({
      showModal: state.showModal,
      setInfo: state.setInfo,
      showModalExtended: state.showModalExtended,
    }),
    shallow
  );

  const router = useRouter();

  const sendPassword = async () => {
    if (source === "email") {
      const res = await changePassword(email);

      if (res.status === 400) {
        setEmailExists(false);
      } else {
        setInfo({
          title: "Email enviado",
          message:
            "Has recibido un correo con las instrucciones para cambiar la contraseña.",
          icon: "good",
          type: "alert",
          textButton: "Cerrar",
        });
        showModal();
        router.push("/");
      }
    } else {
      const res = await getVerificationCode(email);

      if (res.status >= 400) {
        setEmailExists(false);
      } else {
        showModalExtended();
      }
    }
    // }
  };

  const verifyCode = async () => {
    const res = await verifyPhoneCode(email, code);

    if (res) {
      setError(false);
      setValidated(true);
    } else {
      setError(true);
    }
  };

  const loginNewPassword = async () => {
    if (password !== password2) {
      setWrongPassword(true);
    } else {
      setLoading(true);
      setWrongPassword(false);
      const res = await changePasswordWithCode(email, password, code);

      if (res) {
        window.localStorage.setItem("@UserToken", String(res.token));
        Cookies.set("token", String(res.token), { expires: 7 });

        setProfile({
          AuthId: res.user.AuthId,
          email: res.user.emailaddress,
          name: res.user.name,
          isActive: res.user.isactive,
          groups: res.groups,
          token: res.token,
          id: res.user.id,
          roleId: res.user.roleId,
          role_name: res.user.role_name,
        });
        setUserId(res.user.id);
        setToken(res.token);
        showModalExtended();
        setLoading(false);
        router.push("/portal");
      }
    }
  };

  return (
    <div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Escribe tu correo de acceso
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
          />
        </div>
        {!emailExists && (
          <div className="my-2 bg-red-100 rounded-md p-2">
            <p className="text-sm text-red-500 text-center">
              El email introducido no existe
            </p>
          </div>
        )}
      </div>
      <div className="py-8">
        <p className="text-sm font-medium text-gray-700">
          ¿Cómo quieres recibir el cambio de contraseña?
        </p>
        <div className="mt-2 flex justify-center space-x-4 bg-gray-200 p-2 rounded-md">
          <button
            className={clsx(
              source == "email"
                ? "bg-white text-gray-700  shadow"
                : "text-gray-500",
              " flex-1 text-sm rounded py-1 flex justify-center items-center"
            )}
            onClick={() => setSource("email")}
          >
            <Envelope className="w-5 h-5 mr-2" />
            Email
          </button>
          <button
            className={clsx(
              source == "sms"
                ? "bg-white text-gray-700  shadow"
                : "text-gray-500",
              " flex-1 text-sm rounded py-1 flex justify-center items-center"
            )}
            onClick={() => setSource("sms")}
          >
            <SMS className="w-5 h-5 mr-2" />
            SMS
          </button>
        </div>
      </div>

      <div className="pt-4 flex-col space-y-4">
        <button
          disabled={email === ""}
          onClick={sendPassword}
          className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
        >
          <p>
            {source == "email"
              ? "Solicitar cambio contraseña"
              : "Solicitar código"}
          </p>
        </button>

        <Link
          href="/"
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-gray-50 py-3 sm:py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 duration-300"
        >
          Volver
        </Link>
      </div>
      <ModalExtended>
        {!validated ? (
          <>
            <div className="border-b p-4">
              <h3 className="text-center text-gray-700 font-semibold">
                Introduce el código recibido
              </h3>
            </div>

            <div className="p-4">
              <input
                type="text"
                onChange={(e) => setCode(e.target.value)}
                className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
              />

              {error && (
                <div className="my-2 bg-red-100 rounded-md p-2">
                  <p className="text-sm text-red-500 text-center">
                    Código erroneo
                  </p>
                </div>
              )}
              <button
                onClick={verifyCode}
                className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
              >
                <p>
                  {source == "email"
                    ? "Solicitar cambio contraseña"
                    : "Validar código"}
                </p>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="border-b p-4">
              <h3 className="text-center text-gray-700 font-semibold">
                Escribir nueva contraseña
              </h3>
            </div>
            <div className="p-4">
              <div className="mt-1 mb-4">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nueva contraseña"
                    value={password}
                    type={passOpened ? "text" : "password"}
                    className="block w-full rounded-none rounded-l-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
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
              </div>

              <div className="mb-4">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <input
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Repetir nueva contraseña"
                    value={password2}
                    type={passOpened2 ? "text" : "password"}
                    className="block w-full rounded-none rounded-l-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPassOpened2(!passOpened2);
                    }}
                    className="relative bg-gray-50 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {passOpened2 ? (
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

              {wrongPassword && (
                <div className="mt-2 mb-4 bg-red-100 rounded-md p-2">
                  <p className="text-sm text-red-500 text-center">
                    Las contraseñas no coinciden
                  </p>
                </div>
              )}

              <button
                disabled={loading}
                onClick={loginNewPassword}
                className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
              >
                {loading ? (
                  <Ring color="#fff" size={20} />
                ) : (
                  <p>Cambiar contraseña</p>
                )}
              </button>
            </div>
          </>
        )}
      </ModalExtended>
    </div>
  );
};

export default NewPasswordForm;
