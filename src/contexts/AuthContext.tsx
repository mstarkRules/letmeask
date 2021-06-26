import firebase from "firebase";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { useHistory } from "react-router-dom";

type AuthContextType = {
  user: User | undefined;
  loading: boolean;
  handleSetLoading: (valor: boolean) => void;
  signInWithGoogle: () => Promise<void>;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function handleSetLoading(valor: boolean) {
    console.log("o valor é: ", valor);
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  if (loading) {
    return <p>...Carregando</p>;
  }

  return (
    <AuthContext.Provider
      value={{ signInWithGoogle, user, loading, handleSetLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
