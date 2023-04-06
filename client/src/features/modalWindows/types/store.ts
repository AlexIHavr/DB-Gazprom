type ModalWindow = { id: string; type: 'success' | 'error'; message: string };

export type UseModalWindowsStore = {
  modalWindows: ModalWindow[];
  addModalWindow: (modalWindow: Omit<ModalWindow, 'id'>) => void;
  removeModalWindow: (id: string) => void;
};
