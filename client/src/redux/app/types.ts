export type ModalWindow = { type: 'success' | 'error'; message: string };

export type InitialState = {
  isLoading: boolean;
  modalWindows: ({ id: string } & ModalWindow)[];
};

export type ValueOf<T> = T[keyof T];
export type RejectValue = {
  message: string;
};
