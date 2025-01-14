import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePortalStore } from "store/portal";
import { SidebarLink } from "./sidebarLink";
import { MenuLinks, getMenuUrls } from "vars/portal/vars";
import { getRoles } from "shared/helpers";

export const SidebarNavigation = () => {
  const profile = usePortalStore((state) => state.profile);
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const [visualLinks, setVisualLinks] = React.useState(MenuLinks);

  useEffect(() => {
    const newVisualLinks = getMenuUrls(dataProfile.tenantid);

    setVisualLinks(newVisualLinks);
  }, [dataProfile]);

  return (
    <div className="bg-white hidden sm:block w-52 fixed z-50 inset-y-0 border-r">
      <div className="mt-2 px-4">
        <div className=" flex items-center relative h-12 w-auto">
          <Image
            src="/logo-aptd.svg"
            alt="Anagrama de APTD"
            className="object-contain"
            fill
          />
        </div>
      </div>

      <div className="mt-8 px-2 overflow-auto h-full">
        {visualLinks.map((link) => (
          <div key={link.value}>
            {getRoles(link.groups, profile.groups) && (
              <div className="mb-2">
                <SidebarLink
                  section={link}
                  isCompleted={dataProfile.isProfileCompleted}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
