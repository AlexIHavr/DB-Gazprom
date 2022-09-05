export type ModalWindow = { type: 'success' | 'error'; message: string };

export type InitialState = {
  isLoading: boolean;
  modalWindows: ({ id: string } & ModalWindow)[];
};
