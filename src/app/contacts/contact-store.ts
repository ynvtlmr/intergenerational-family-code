import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Contact {
  name: string;
  title: string;
  email: string;
  phone: string;
}

interface ContactState {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  deleteContact: (contact: Contact) => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      contacts: [],
      addContact: (contact: Contact) =>
        set((state) => ({
          contacts: [...state.contacts, contact],
        })),
      deleteContact: (contact: Contact) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c !== contact),
        })),
    }),
    { name: "contacts" }
  )
);
