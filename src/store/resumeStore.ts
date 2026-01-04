import { create } from "zustand";

type ResumeState = {
  file: File | null;
  text: string;
  setFile: (file: File) => void;
  setText: (text: string) => void;
};

export const useResumeStore = create<ResumeState>((set) => ({
  file: null,
  text: "",
  setFile: (file) => set({ file }),
  setText: (text) => set({ text }),
}));
    