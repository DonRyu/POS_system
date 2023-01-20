import {useAuth} from "./auth";
import {useNavigate} from "react-router-dom";
import * as React from "react";

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <div>
      {!auth.user ?
        <p>You are not logged in.</p> :
        <button
          className={'title-bar-btns'}
          onClick={() => {
            auth.signout(() => navigate('/'));
          }}
        >
          Sign out
        </button>
      }

    </div>
  );
}

export default AuthStatus
