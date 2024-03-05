import { createContext, useContext, useEffect, useState } from "react";
import { User, auth, onAuthStateChanged } from "@/lib/firebase";

type AuthContext = {
  user: User | null;
  isAuthenticating: boolean;
};

const authContext = createContext<AuthContext>({
  user: null,
  isAuthenticating: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticating(true);

      setUser(user ? user : null);

      setIsAuthenticating(false);
    });
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
