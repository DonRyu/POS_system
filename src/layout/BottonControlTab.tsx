import React from "react";
import Button from '@mui/material/Button';
import {useIntl} from "react-intl";

const BottonControlTab: React.FC = () => {
  const intl = useIntl();
  return (
    <div className={'absolute bottom-1 w-full flex flex-row p-1'} style={{height: '6%'}}>
      <div className={'grid grid-cols-5 gap-2 h-full'} style={{width: '75%'}}>
        <Button variant="contained">Text</Button>
        <Button variant="contained">Text</Button>
        <Button variant="contained">Text</Button>
        <Button variant="contained">Text</Button>
        <Button variant="contained">Text</Button>
      </div>
      <div style={{width: '25%'}} className={'ml-5 grid grid-cols-1'}>
        <Button variant="contained" color={'info'}>{intl.formatMessage({id: 'new_order'})}</Button>
      </div>

    </div>
  );
};

export default BottonControlTab;
