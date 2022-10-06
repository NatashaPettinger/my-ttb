import React from "react";

//const authContext = React.createContext();

export default function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    loginAuth() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logoutAuth() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

/* export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
} */