"use client";
import { Loader2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { deleteContact } from "./actions";

export default function Contact({ contact }: { contact: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteContact(contact);
    setIsDeleting(false);
  };
  return (
    <div className="prose mt-8 rounded-lg border p-5">
      <h2>{contact.name}</h2>
      <p>{contact.title}</p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      {isDeleting ? (
        <Loader2 className="animate-spin" size={24}>
          <title className="sr-only">Delete</title>
        </Loader2>
      ) : (
        <Trash2Icon size={24} onClick={handleDelete}>
          <title className="sr-only">Delete</title>
        </Trash2Icon>
      )}
    </div>
  );
}
