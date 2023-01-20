import {useAuth} from "./auth";
import {Navigate, useLocation} from "react-router-dom";
import * as React from "react";

function RequireAuth({children}: { children: any }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/" state={{from: location}} replace/>;
  }

  return children;
}

export default RequireAuth
