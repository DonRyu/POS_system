import * as React from "react";
import {AuthContext, Auth} from "./auth";
import {useNavigate} from "react-router-dom";
import CryptoJS from 'crypto-js';
import {api, util} from "../service";
import {useEffect, useState} from "react";


//Auth 인증 로직을 쓰는곳

function AuthProvider({children}: { children: React.ReactNode }) {
  let navigate = useNavigate();
  let [user, setUser] = React.useState<any>(false);
  let [apiKey, setApiKey] = useState()
  let [correctInfo, setCorrectInfo] = useState(true)


  useEffect(() => {
    window.api.sendAsync('apiKey').then((res: any) => {
      setApiKey(res)
    })
  }, [])


  let signin = (id: string, password: string, callback: VoidFunction) => {
    return Auth.signin(() => {
      const md5 = CryptoJS.MD5(`${password}${apiKey}`)
      const encodedPws = CryptoJS.enc.Hex.stringify(md5);

      window.api.sendAsync('login', {id, password: encodedPws}).then((result: any) => {
          if (result) {
            api.login(id, password).catch()
            setUser(id);
            setCorrectInfo(true)
            navigate('/dashboard', {replace: true});
          } else {
            setCorrectInfo(false)
            navigate('/', {replace: true});
          }
        }
      );
    });
  };

  let signout = (callback: VoidFunction) => {
    return Auth.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = {user, signin, signout, correctInfo};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider
