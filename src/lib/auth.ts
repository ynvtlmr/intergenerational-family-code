"use server";

import { auth, signInWithEmailAndPassword } from "@/lib/firebase";

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log(userCredential.user);
}
