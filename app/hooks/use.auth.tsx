import type { User } from "firebase/auth";
import type { FC } from "react";
import { useContext, useMemo, useState } from "react";
import { createContext } from "react";
import { auth } from "~/models/firebase.client";
import { useEnhancedEffect } from "./use.enhanced.effect";

interface ContextI {
  userId: string;
  user?: User;
  emailVerified?: boolean;
}
export const AuthContext = createContext<ContextI>({
  userId: "",
  user: undefined,
  emailVerified: false,
});

const useAuthStateChange = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const userId = user?.uid ?? "";

  useEnhancedEffect(() => {
    auth.onAuthStateChanged((c) => {
      if (c?.uid) {
        setUser(c);
      } else {
        setUser(undefined);
      }
    });
  }, []);
  

  const authStateData = useMemo(
    () => ({
      userId,
      user,
      emailVerified: user?.emailVerified,
    }),
    [user, userId]
  );
  return authStateData;
};

interface ProviderProps {
  children?: React.ReactNode;
}
export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const authValue = useAuthStateChange();
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
