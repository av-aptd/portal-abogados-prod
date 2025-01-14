import create from "zustand";
import { persist } from "zustand/middleware";

interface Answer {
  title?: string;
  selected?: string | number | undefined;
  nextQuestionKey?: string;
  questionKey?: string;
  discardKey?: string;
}

interface Property {
  propertyKey?: string;
  propertyValue?: any;
}

interface PAnswer {
  userId: any;
  groupValue?: string;
  groupKey?: string;
  groupNextKey?: string;
  properties?: Property[];
}

interface PreguntasState {
  userId: number;
  answer: Answer;
  discard: any;
  finalAnswer: Answer;
  answers: Answer[];
  openModal: boolean;
  type: string | null;
  currentQuestion: string;
  options: string[];
  lead: any;
  token: string;
  debtValue: any;
  planId: any;
  activo: any;
  activos: any;
  option: string;
  userActivos: any;
  addAnswer: (answer: Answer) => void;
  insertAnswer: (answer: PAnswer) => void;
  setAnswer: (answer: Answer) => void;
  setDiscard: (discard: any) => void;
  updateAnswer: (finalAnswer: Answer) => void;
  showModal: () => void;
  reset: () => void;
  setType: (type: string) => void;
  setUserId: (userId: number) => void;
  setLead: (lead: any) => void;
  setToken: (token: string) => void;
  setCurrentQuestion: (currentQuestion: string) => void;
  setDebtValue: (debtValue: number) => void;
  setPlanId: (planId: string) => void;
  addActivo: (activo: any) => void;
  addOption: (option: any) => void;
  removeOption: (option: any) => void;
  setUserActivos: (userActivos: any) => void;
}

let defaultState = {
  answer: {},
  activo: {},
  userId: 0,
  option: "",
  discard: "",
  token: "",
  finalAnswer: {},
  answers: [],
  options: [],
  openModal: false,
  lead: null,
  type: null,
  currentQuestion: "datosresidencia",
  debtValue: 0,
  planId: "",
  userActivos: [],
  activos: [],
};

export const usePreguntasStore = create<PreguntasState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setAnswer: (answer: Answer) => set({ answer: answer }),
      setToken: (token: string) => set({ token: token }),
      setDiscard: (discard: any) => set({ discard: discard }),
      updateAnswer: (finalAnswer: Answer) => set({ finalAnswer: finalAnswer }),
      addAnswer: (answer) =>
        set((state) => ({ answers: [...state.answers, answer] })),
      insertAnswer: async (answer) => {
        const state = get();
        await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${state.userId}/properties-info`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.token}`,
            },
            body: JSON.stringify(answer),
          }
        );
      },
      showModal: () => set((state) => ({ openModal: !state.openModal })),
      reset: () => {
        usePreguntasStore.persist.clearStorage();
        set(defaultState);
      },
      setType: (type: string) => set({ type: type }),
      setUserId: (userId: number) => set({ userId: userId }),
      setLead: (lead: any) => set({ lead: lead }),
      setCurrentQuestion: (currentQuestion: string) =>
        set({ currentQuestion: currentQuestion }),
      setDebtValue: (debtValue: any) => set({ debtValue: debtValue }),
      setPlanId: (planId: any) => set({ planId: planId }),
      setUserActivos: (userActivos: any) => set({ userActivos: userActivos }),
      addActivo: (activo) =>
        set((state) => ({ activos: [...state.activos, activo] })),
      addOption: (option) =>
        set((state) => ({
          options: [...state.options, option],
        })),
      removeOption: (option) =>
        set((state) => ({
          options: state.options.filter((o) => o !== option),
        })),
    }),
    {
      name: "preguntas-iniciales",
      getStorage: () => sessionStorage,
    }
  )
);
