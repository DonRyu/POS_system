import * as React from "react";

interface AuthContextType {
  user: any;
  signin: (user: string, password: string, callback?: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  correctInfo?: boolean
}

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}

const Auth = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    Auth.isAuthenticated = true;
    callback();
  },
  signout(callback: VoidFunction) {
    Auth.isAuthenticated = false;
    callback();
  },
};

export {Auth, AuthContextType, useAuth, AuthContext};
