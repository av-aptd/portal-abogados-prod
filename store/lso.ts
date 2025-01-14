import create from "zustand";
import { persist } from "zustand/middleware";

interface Answer {
  id?: number;
  title?: string;
  options?: any;
  navigation?: any;
  type?: string;
}

interface LsoState {
  answer: Answer;
  answers: Answer[];
  modAnswers: Answer[];
  discard: number;
  currentPosition: number;
  setDiscard: (discard: number) => void;
  addCurrentPosition: () => void;
  removeCurrentPosition: () => void;
  setAnswer: (answer: Answer) => void;
  setModAnswers: (id: number) => void;
  addAnswer: (answer: Answer) => void;
  deleteAnswer: (id: number) => void;
}

export const useLsoStore = create<LsoState>()(
  persist(
    (set, get) => ({
      answer: {},
      answers: [],
      modAnswers: [],
      discard: 0,
      currentPosition: 0,
      setDiscard: (discard: any) => set({ discard }),
      addCurrentPosition: () =>
        set((state) => ({ currentPosition: state.currentPosition + 1 })),
      removeCurrentPosition: () =>
        set((state) => ({ currentPosition: state.currentPosition - 1 })),
      setAnswer: (answer: Answer) => set({ answer: answer }),
      setModAnswers: (id: number) =>
        set((state) => ({ modAnswers: state.answers.splice(id) })),
      addAnswer: (answer) =>
        set((state) => ({ answers: [...state.answers, answer] })),
      deleteAnswer: (id) =>
        set((state) => ({
          answers: state.answers.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "LSO",
      getStorage: () => sessionStorage,
    }
  )
);
