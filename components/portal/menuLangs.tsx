import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Flag } from "components/icons";
import { usePortalStore } from "store/portal";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const MenuLangs = () => {
  const setLogOut = usePortalStore((state) => state.setLogOut);
  const router = useRouter();

  const LogOut = () => {
    setLogOut();
    router.push("/");
  };

  return (
    <Menu as="div" className="relative mr-1 flex-shrink-0">
      <div>
        <Menu.Button className="flex items-center space-x-2 rounded-full text-sm text-white focus:outline-none">
          <span className="sr-only">Abri menú de idiomas</span>
          <Flag className="h-7 w-7 text-gray-400" />
          {/* <div>
            <p className="text-gray-400 font-medium">{profile.name}</p>
          </div> */}
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
        <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* <Menu.Item>
            {({ active }) => (
              <button
                className={clsx(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-sm text-gray-700"
                )}
                onClick={async () => await setLanguage("en")}
              >
                English
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={clsx(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-sm text-gray-700"
                )}
                onClick={async () => await setLanguage("es")}
              >
                Español
              </button>
            )}
          </Menu.Item> */}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
