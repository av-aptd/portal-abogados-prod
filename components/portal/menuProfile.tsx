import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Profile } from "components/icons";
import { usePortalStore } from "store/portal";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Cookies from "js-cookie";

export const MenuProfile = () => {
  const profile = usePortalStore((state) => state.profile);
  const setLogOut = usePortalStore((state) => state.setLogOut);
  const router = useRouter();

  const resetPortal = usePortalStore((state) => state.resetPortal);

  const LogOut = () => {
    setLogOut();
    window.localStorage.removeItem("@UserToken");
    Cookies.remove("token");
    router.push("/");
    resetPortal();
  };

  return (
    <Menu as="div" className="relative ml-2 flex-shrink-0">
      <div>
        <Menu.Button className="flex items-center space-x-2 rounded-full text-sm text-white focus:outline-none">
          <span className="sr-only">Abri menú de usuario</span>
          <Profile className="h-7 w-7 text-gray-400" />
          <div>
            <p className="text-secondary font-medium">{profile.name}</p>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* <Menu.Item>
            {({ active }) => (
              <Link
                href="/portal/perfil/cambiar-password"
                className={clsx(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-sm text-gray-700"
                )}
                onClick={() => {}}
              >
                {t("ui.menus.perfil.cambiar")}
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/portal/perfil/configuracion"
                className={clsx(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-sm text-gray-700 text-left"
                )}
                onClick={() => {}}
              >
                {t("ui.menus.perfil.configuracion")}
              </Link>
            )}
          </Menu.Item> */}
          <Menu.Item>
            {({ active }) => (
              <button
                className={clsx(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-sm text-gray-700 text-left"
                )}
                onClick={() => LogOut()}
              >
                Salir
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
