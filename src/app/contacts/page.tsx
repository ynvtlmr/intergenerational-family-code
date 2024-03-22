"use client";

import { Button } from "@/components/ui/button";
import { ContactForm } from "./contact-form";
import { Contact, useContactStore } from "./contact-store";
import { Trash2Icon } from "lucide-react";

export default function ContactPage() {
  const contacts = useContactStore((s) => s.contacts);
  return (
    <main className="min-h-screen px-6 pt-5">
      <h1 className="text-3xl font-bold">Contact Form</h1>
      <ContactForm />
      <div>
        {contacts.map((contact) => (
          <Contact key={contact.email} contact={contact} />
        ))}
      </div>
    </main>
  );
}

function Contact({ contact }: { contact: Contact }) {
  const deleteContact = useContactStore((s) => s.deleteContact);

  const handleDelete = () => {
    deleteContact(contact);
  };
  return (
    <div className="prose mt-8 rounded-lg border p-5">
      <h2>{contact.name}</h2>
      <p>{contact.title}</p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <Button variant="destructive" onClick={handleDelete}>
        <Trash2Icon />
      </Button>
    </div>
  );
}
