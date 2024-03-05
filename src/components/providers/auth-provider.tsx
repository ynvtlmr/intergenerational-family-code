"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, auth, onAuthStateChanged } from "@/lib/firebase";

type AuthContext = {
  user: User | null;
  isAuthenticating: boolean;
};

const authContext = createContext<AuthContext>({
  user: null,
  isAuthenticating: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);

      setIsAuthenticating(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    <authContext.Provider value={{ user, isAuthenticating }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  if (authContext === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useContext(authContext);
}
