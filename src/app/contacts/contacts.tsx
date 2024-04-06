import { createClient } from "@/lib/supabase/server";
import Contact from "./contact";

export default async function Contacts() {
  const supabase = createClient();
  const { data: contacts, error } = await supabase.from("contacts").select("*");
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {contacts ? (
        contacts.map((contact) => (
          <Contact key={contact.email} contact={contact} />
        ))
      ) : (
        <div>You have no contacts yet.</div>
      )}
    </div>
  );
}
