import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AuthStatus from "../auth/AuthStatus";


const Header = () => {
  return (
    <div className={'w-full flex flex-row justify-between'} id={'header'}>
      <button >
        <MenuIcon/>
      </button>
      <AuthStatus/>
    </div>
  );
}

export default Header
