import { create } from "zustand";


interface ContactState {
  name: string | null;
  email: string | null;
  phone: string | null;
  org: string | null; 
  updateContact: (name: string, email: string, phone: string, org: string) => void;
}


export const useContactStore = create<ContactState>((set) => ({
  name: null,
  email: null,
  phone: null,
  org: null,
  updateContact : (name, email, phone, org) => set({ name, email, phone, org }),
}));



export const useContact = () => {
  return {
    name: useContactStore((s) => s.name),
    email: useContactStore((s) => s.email),
    phone: useContactStore((s) => s.phone),
    org: useContactStore((s) => s.org),
    updateContact: useContactStore((s) => s.updateContact),
  }
}

