import { Modal } from "components/modal";
import { useUIStore } from "store/ui";

export default function LoginLayout({ children }: any) {
  const showModal = useUIStore((state) => state.showModal);

  return (
    <>
      <main>{children}</main>
      <Modal action={() => showModal()} />
    </>
  );
}
