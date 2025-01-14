import create from "zustand";
import { persist } from "zustand/middleware";

interface FileState {
  nulidades: any[];
  setNulidades: (nulidades: any) => void;
  deleteAll: () => void;
}

const useNulidadesStore = create<FileState>()(
  persist(
    (set) => ({
      nulidades: [],
      setNulidades: (nulidades) => set({ nulidades: nulidades }),
      deleteAll: () =>
        set((state) => ({
          nulidades: [],
        })),
    }),
    {
      name: "nulidades-storage",
    }
  )
);

export default useNulidadesStore;
