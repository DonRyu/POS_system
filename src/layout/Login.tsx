import React, {useEffect, useState} from "react";
import {useAuth} from "../auth/auth";
import {useIntl} from "react-intl";


function Login() {
  let auth = useAuth();
  const intl = useIntl();


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get('username') as string;
    let password = formData.get('password') as string;
    auth.signin(username, password);
  }

  return (
    <div className={'bg-blue-700 w-full flex justify-center items-center'} style={{height: '96%'}}>
      <div className={'border-2 bg-white w-1/3 h-4/5 flex justify-center items-center  '}>
        <form onSubmit={handleSubmit} className={'flex flex-col'}>
          <label>
            {intl.formatMessage({id: 'username'})}
          </label>
          <input className={'border-2'} name="username" type="text"/>
          <label>
            {intl.formatMessage({id: 'password'})}
          </label>
          <input className={'border-2'} id="password" type="password" name="password"/>
          <button type="submit" className={'mt-2 border-2'}> {intl.formatMessage({id: 'login'})}</button>
          <div>{!auth.correctInfo && intl.formatMessage({id: 'login_fail'})}</div>
        </form>

      </div>
    </div>
  );

}

export default Login;
