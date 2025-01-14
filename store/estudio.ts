import create from "zustand";
import { persist } from "zustand/middleware";

interface Answer {
  title?: string;
  selected?: string | number | undefined;
  nextQuestionKey?: string;
  questionKey?: string;
  discardKey?: string;
}

interface EstudioState {
  answer: Answer;
  discard: any;
  finalAnswer: Answer;
  answers: Answer[];
  openModal: boolean;
  openModalHelp: boolean;
  type: string | null;
  currentQuestion: string;
  authId: any;
  token: any;
  lead: any;
  debtValue: any;
  planId: any;
  initialData: any;
  status: number;
  help: any;
  addAnswer: (answer: Answer) => void;
  setAnswer: (answer: Answer) => void;
  setDiscard: (discard: any) => void;
  updateAnswer: (finalAnswer: Answer) => void;
  showModal: () => void;
  showHelpModal: () => void;
  reset: () => void;
  setType: (type: string) => void;
  setLead: (lead: any) => void;
  setToken: (token: any) => void;
  setAuthId: (authId: any) => void;
  setHelp: (help: any) => void;
  setCurrentQuestion: (currentQuestion: string) => void;
  setDebtValue: (debtValue: number) => void;
  setPlanId: (planId: string) => void;
  setAnswers: (answers: Answer[]) => void;
  setStatus: (status: number) => void;
}

let defaultState = {
  answer: {},
  discard: "",
  finalAnswer: {},
  answers: [],
  authId: null,
  token: null,
  status: 0,
  help: [],
  initialData: {},
  openModal: false,
  openModalHelp: false,
  lead: null,
  type: "LSO",
  currentQuestion: "datosiniciales",
  debtValue: 0,
  planId: "",
};

export const useEstudioStore = create<EstudioState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setAnswer: (answer: Answer) => set({ answer: answer }),
      setInitialData: (initialData: any) =>
        set({
          answers: initialData.answers,
          lead: initialData.lead,
          type: initialData.type,
          debtValue: initialData.debtValue,
        }),
      setDiscard: (discard: any) => set({ discard: discard }),
      setAuthId: (authId: any) => set({ authId: authId }),
      setAnswers: (answers: Answer[]) => set({ answers: answers }),
      updateAnswer: (finalAnswer: Answer) => set({ finalAnswer: finalAnswer }),
      addAnswer: async (answer) => {
        const state = get();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/leads/save-survey/${state.type}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lead: state.lead,
              answers: [...state.answers, answer],
              debtValue: state.debtValue,
              type: state.type,
              currentQuestion: state.currentQuestion,
              status: state.status,
            }),
          }
        );
        set((state) => ({ answers: [...state.answers, answer] }));
      },
      showModal: () => set((state) => ({ openModal: !state.openModal })),
      showHelpModal: () =>
        set((state) => ({ openModalHelp: !state.openModalHelp })),
      reset: () => {
        useEstudioStore.persist.clearStorage();
        set(defaultState);
      },
      setType: (type: string) => set({ type: type }),
      setLead: (lead: any) => set({ lead: lead }),
      setToken: (token: any) => set({ token: token }),
      setHelp: (help: any) => set({ help: help }),
      setCurrentQuestion: (currentQuestion: string) =>
        set({ currentQuestion: currentQuestion }),
      setDebtValue: (debtValue: any) => set({ debtValue: debtValue }),
      setPlanId: (planId: any) => set({ planId: planId }),
      setStatus: (status: number) => set({ status: status }),
    }),

    {
      name: "estudio-economico",
      getStorage: () => sessionStorage,
    }
  )
);
