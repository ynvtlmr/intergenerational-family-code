import { Suspense } from "react";
import Loading from "@/components/loading";
import Contacts from "./contacts";
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 pt-5">
      <h1 className="text-3xl font-bold">Contacts</h1>
      <ContactForm />
      <Suspense fallback={<Loading />}>
        <Contacts />
      </Suspense>
    </main>
  );
}
