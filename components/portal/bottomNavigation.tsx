import clsx from "clsx";
import React from "react";
import { getRoles } from "shared/helpers";
import { usePortalStore } from "store/portal";
import { MenuLinks } from "vars/portal/vars";
import { BottomLink } from "./bottomLinks";

export const BottomNavigation = () => {
  const profile = usePortalStore((state) => state.profile);
  const dataProfile = usePortalStore((state) => state.dataProfile);

  return (
    <div className="bg-primary sm:hidden fixed bottom-0 inset-x-0 overflow-scroll z-[100]">
      <div className="flex justify-around space-x-4 my-2 px-4 pr-20">
        {MenuLinks.map((link) => (
          <div
            key={link.value}
            className={clsx(
              "shrink-0",
              getRoles(link.groups, profile.groups) ? "block" : "hidden"
            )}
          >
            <BottomLink
              link={link}
              isCompleted={dataProfile.isProfileCompleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
