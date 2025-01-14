import create from "zustand";
import { persist } from "zustand/middleware";

interface FileState {
  burofaxes: any[];
  setBurofaxes: (burofax: any) => void;
  deleteAll: () => void;
}

const useBurofaxStore = create<FileState>()(
  persist(
    (set) => ({
      burofaxes: [],
      setBurofaxes: (burofaxes) => set({ burofaxes: burofaxes }),
      deleteAll: () =>
        set((state) => ({
          burofaxes: [],
        })),
    }),
    {
      name: "burofax-storage",
    }
  )
);

export default useBurofaxStore;
