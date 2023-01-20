import * as React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import CurrentCustomeTable from '../components/dashboard/CurrentCustomeTable';
import CurrentDeliveryTable from "../components/Delivery";
import {Tab, TabPanel, TabsList} from "../style/styles";
import TogoTable from "../components/ToGoTable";
import {useIntl} from "react-intl";
import BottonControlTab from "./BottonControlTab";


const TabBar = () => {
  const intl = useIntl();

  return (
    <>
      <TabsUnstyled defaultValue={0} className={'w-full viewHeight border-b-2 pb-3'}>
        <TabsList>
          <Tab>로고 스토어이름</Tab>
          <Tab>{intl.formatMessage({id: 'delivery'})}</Tab>
          <Tab>{intl.formatMessage({id: 'to_go'})}</Tab>
          <Tab>Four</Tab>
        </TabsList>
        <TabPanel className={'w-full h-full'} value={0}><CurrentCustomeTable/></TabPanel>
        <TabPanel className={'w-full h-full'} value={1}><CurrentDeliveryTable/></TabPanel>
        <TabPanel className={'w-full h-full'} value={2}><TogoTable/></TabPanel>
      </TabsUnstyled>
      <BottonControlTab/>
    </>
  )
    ;
}

export default TabBar
