import React, { useEffect } from "react";
import { BottomNavigation } from "components/portal/bottomNavigation";
import { HeaderPortal } from "components/portal/header";
import { ModalNotification } from "components/portal/modalNotification";
import { Notification } from "components/portal/notification";
import { NotificationSlideOver } from "components/portal/notificationSlide";
import { SidebarNavigation } from "components/portal/sidebarDesktop";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";
import { chekRoles } from "shared/helpers";
import Script from "next/script";
import { Modal } from "components/modal";
import HelpSlideOver from "components/portal/helpSlideOver";

export default function PortalLayout({ children }: any) {
  const profile = usePortalStore((state) => state.profile);
  const showInitialForm: any = useUIStore((state) => state.showInitialForm);
  const showModal = useUIStore((state) => state.showModal);

  useEffect(() => {
    if (profile.isActive && chekRoles(profile.groups, "Cliente")) {
      showInitialForm();
    }
  }, [profile]);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <SidebarNavigation />
        <div className="flex-1 flex-col">
          <HeaderPortal />
          <div className="pt-16 px-4 sm:pl-56 pb-24 bg-gray-100">
            {children}
          </div>
          <NotificationSlideOver />
          <Notification />
          <ModalNotification />
          <BottomNavigation />
          <Modal action={() => showModal()} />
          <HelpSlideOver />
        </div>
      </div>
    </>
  );
}
