import create from "zustand";

interface Info {
  title?: string;
  message?: string;
  icon?: string;
  textButton?: string;
  type?: string;
}

interface AlertNotification {
  title?: string;
  message?: string;
  icon?: string;
}

interface Notification {
  id?: number;
  created_at?: string;
  message?: string;
  isRead?: boolean;
}

interface UIState {
  openNotifications: boolean;
  openNotification: boolean;
  openNewCreditor: boolean;
  openNewNotation: boolean;
  openNewIncident: boolean;
  openNewPayment: boolean;
  openModal: boolean;
  openInitialForm: boolean;
  openModalNotification: boolean;
  openModalExtended: boolean;
  openAlert: boolean;
  creditorType: string;
  info: Info;
  infoAlertNotification: AlertNotification;
  infoNotification: Notification;
  loading: boolean;
  openModalHelp: boolean;
  help: any;
  typeModal: string;
  setHelp: (help: any) => void;
  showNotifications: () => void;
  showNotification: () => void;
  showNewIncident: () => void;
  showNewPayment: () => void;
  showNewCreditor: () => void;
  showNewNotation: () => void;
  showHelpModal: () => void;
  showInitialForm: () => void;
  showModal: () => void;
  showModalNotification: () => void;
  showModalExtended: () => void;
  showAlert: () => void;
  setInfo: (data: any) => void;
  setInfoNotification: (data: any) => void;
  setInfoAlertNotification: (data: any) => void;
  setLoading: (value: boolean) => void;
  setTypeModal: (typeModal: string) => void;
  setCreditorType: (creditorType: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  info: {},
  infoAlertNotification: {},
  infoNotification: {},
  openNotifications: false,
  openNewIncident: false,
  openNewPayment: false,
  openNotification: false,
  openNewCreditor: false,
  openNewNotation: false,
  openInitialForm: false,
  openModal: false,
  openModalNotification: false,
  openModalExtended: false,
  openAlert: false,
  creditorType: "user",
  loading: false,
  openModalHelp: false,
  help: [],
  typeModal: "",
  setHelp: (help: any) => set({ help: help }),
  showNotifications: () =>
    set((state) => ({ openNotifications: !state.openNotifications })),
  showNotification: () =>
    set((state) => ({ openNotification: !state.openNotification })),
  showNewCreditor: () =>
    set((state) => ({ openNewCreditor: !state.openNewCreditor })),
  showNewIncident: () =>
    set((state) => ({ openNewIncident: !state.openNewIncident })),
  showNewPayment: () =>
    set((state) => ({ openNewPayment: !state.openNewPayment })),
  showNewNotation: () =>
    set((state) => ({ openNewNotation: !state.openNewNotation })),
  showInitialForm: () =>
    set((state) => ({ openInitialForm: !state.openInitialForm })),
  showModal: () => set((state) => ({ openModal: !state.openModal })),
  showModalNotification: () =>
    set((state) => ({ openModalNotification: !state.openModalNotification })),
  showHelpModal: () =>
    set((state) => ({ openModalHelp: !state.openModalHelp })),
  showModalExtended: () =>
    set((state) => ({ openModalExtended: !state.openModalExtended })),
  showAlert: () => set((state) => ({ openAlert: !state.openAlert })),
  setInfo: (data: any) =>
    set((state) => ({
      info: {
        title: data.title,
        message: data.message,
        icon: data.icon,
        textButton: data.textButton,
        type: data.type,
      },
    })),
  setInfoAlertNotification: (data: any) =>
    set((state) => ({
      infoAlertNotification: {
        title: data.title,
        message: data.message,
        icon: data.icon,
      },
    })),
  setInfoNotification: (data: any) =>
    set((state) => ({
      infoNotification: {
        id: data.id,
        created_at: data.created_at,
        message: data.message,
        isRead: data.isRead,
      },
    })),
  setLoading: (value: boolean) => set(() => ({ loading: value })),
  setTypeModal: (value: string) => set(() => ({ typeModal: value })),
  setCreditorType: (value: string) => set(() => ({ creditorType: value })),
}));
