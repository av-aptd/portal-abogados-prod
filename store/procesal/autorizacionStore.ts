import create from "zustand";
import { persist } from "zustand/middleware";

interface FileState {
  autorizaciones: any[];
  setAutorizaciones: (venias: any) => void;
  deleteAll: () => void;
}

const useAutorizacionStore = create<FileState>()(
  persist(
    (set) => ({
      autorizaciones: [],
      setAutorizaciones: (autorizaciones) =>
        set((state) => ({ autorizaciones: autorizaciones })),
      deleteAll: () =>
        set((state) => ({
          autorizaciones: [],
        })),
    }),
    {
      name: "autorizacion-storage",
    }
  )
);

export default useAutorizacionStore;
