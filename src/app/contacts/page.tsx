import { ContactForm } from "./contact-form";
import { Suspense } from "react";
import Contacts from "./contacts";
import Loading from "@/components/loading";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 pt-5">
      <h1 className="text-3xl font-bold">Contact Form</h1>
      <ContactForm />
      <Suspense fallback={<Loading />}>
        <Contacts />
      </Suspense>
    </main>
  );
}
