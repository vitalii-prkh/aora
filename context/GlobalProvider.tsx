import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import {getUser} from "../lib/appwrite";

type TGlobalContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: Awaited<ReturnType<typeof getUser>> | null;
  setUser: (user: Awaited<ReturnType<typeof getUser>> | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const GlobalContext = createContext<TGlobalContext>({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  user: null,
  setUser: (user: Awaited<ReturnType<typeof getUser>> | null) => {},
  isLoading: true,
  setIsLoading: (isLoading: boolean) => {},
});

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider(props: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Awaited<ReturnType<typeof getUser>> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch(() => console.log("Error fetching user data"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
