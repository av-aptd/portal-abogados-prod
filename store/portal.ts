import create from "zustand";
import { persist } from "zustand/middleware";

interface Profile {
  AuthId?: string;
  name?: string;
  isActive?: boolean;
  groups?: string[];
  token?: string;
  id?: number;
  email?: string;
  role_name?: string;
  roleId?: number;
}

interface Answer {
  title?: string;
  selected?: string | number | undefined;
  nextQuestionKey?: string;
  questionKey?: string;
  discardKey?: string;
}

interface Notification {
  id: number;
  created_at: string;
  userId: number;
  message: string;
  notificationType: string;
  isRead: boolean;
}

interface PortalState {
  profile: Profile;
  dataProfile: any;
  notifications: Notification[];
  urlParams: string;
  lead: any;
  paymentComplete: boolean;
  client: any;
  type: string | null;
  answers: Answer[];
  clientInfo: any[];
  isImpersonate: boolean;
  originalProfile: any;
  originalDataProfile: any;
  docId: any;
  process: any;
  questionPresentation: string;
  setProfile: (profile: Profile) => void;
  setDataProfile: (dataProfile: any) => void;
  setURLParams: (urlParams: string) => void;
  setNotifications: (notifications: Notification[]) => void;
  setClientInfo: (clientInfo: any[]) => void;
  setClient: (client: any) => void;
  setPaymentComplete: () => void;
  setLogOut: () => void;
  setAnswers: (answers: Answer[]) => void;
  setLead: (lead: any) => void;
  setType: (type: string) => void;
  setImpersonate: () => void;
  resetPortal: () => void;
  setOriginalProfile: (originalProfile: any) => void;
  setOriginalDataProfile: (originalDataProfile: any) => void;
  setDocId: (docId: any) => void;
  setProcess: (process: any) => void;
  setQuestionPresentation: (questionPresentation: string) => void;
}

let defaultState = {
  answers: [],
  lead: null,
  type: null,
  questionPresentation: "minimal",
};

export const usePortalStore = create<PortalState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      profile: {},
      process: {},
      dataProfile: {},
      notifications: [],
      urlParams: "",
      paymentComplete: false,
      isImpersonate: false,
      client: {},
      clientInfo: [],
      originalProfile: {},
      originalDataProfile: {},
      docId: null,
      resetPortal: () => {
        usePortalStore.persist.clearStorage();
        set(defaultState);
      },
      setProfile: (profile: Profile) => set({ profile: profile }),
      setImpersonate: () =>
        set((state) => ({ isImpersonate: !state.isImpersonate })),
      setClientInfo: (clientInfo: any[]) => set({ clientInfo: clientInfo }),
      setClient: (client: any[]) => set({ client: client }),
      setDataProfile: (dataProfile: any) => set({ dataProfile: dataProfile }),
      setURLParams: (urlParams: string) => set({ urlParams: urlParams }),
      setNotifications: (notifications: Notification[]) =>
        set({ notifications: notifications }),
      setLogOut: () => set({ profile: {} }),
      setAnswers: (answers: Answer[]) => set({ answers: answers }),
      setLead: (lead: any) => set({ lead: lead }),
      setType: (type: string) => set({ type: type }),
      setDocId: (docId: any) => set({ docId: docId }),
      setPaymentComplete: () =>
        set((state) => ({ paymentComplete: !state.paymentComplete })),
      setOriginalProfile: (originalProfile: any) =>
        set({ originalProfile: originalProfile }),
      setOriginalDataProfile: (originalDataProfile: any) =>
        set({ originalDataProfile: originalDataProfile }),
      setProcess: (process: any) => set({ process: process }),
      setQuestionPresentation: (questionPresentation: string) =>
        set({ questionPresentation: questionPresentation }),
    }),
    {
      name: "Profile",
      getStorage: () => sessionStorage,
    }
  )
);
