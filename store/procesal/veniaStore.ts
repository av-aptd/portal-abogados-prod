import create from "zustand";
import { persist } from "zustand/middleware";

interface FileState {
  venias: any[];
  abogadoActual: string;
  colegiadoActual: string;
  setVenias: (venias: any) => void;
  setAbogadoActual: (nombre: any) => void;
  setColegiadoActual: (colegiado: any) => void;
  deleteAll: () => void;
}

const useVeniaStore = create<FileState>()(
  persist(
    (set) => ({
      venias: [],
      abogadoActual: "",
      colegiadoActual: "",
      setVenias: (venias) => set((state) => ({ venias: venias })),
      setAbogadoActual: (nombre: string) =>
        set((state) => ({ abogadoActual: nombre })),
      setColegiadoActual: (colegiado: string) =>
        set((state) => ({ colegiadoActual: colegiado })),
      deleteAll: () =>
        set((state) => ({
          venias: [],
          abogadoActual: "",
          colegiadoActual: "",
        })),
    }),
    {
      name: "venia-storage",
    }
  )
);

export default useVeniaStore;
