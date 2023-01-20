import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeliveryTable from "./DeliveryTable";
import {useIntl} from "react-intl";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Delivery: React.FC = () => {

  const [value, setValue] = React.useState(0);
  const intl = useIntl();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className={'w-full'}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={intl.formatMessage({id: 'waiting'})} {...a11yProps(0)} />
          <Tab label={intl.formatMessage({id: 'processing'})} {...a11yProps(1)} />
          <Tab label={intl.formatMessage({id: 'complete'})} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DeliveryTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeliveryTable/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeliveryTable/>
      </TabPanel>
    </Box>
  );
};


export default Delivery;
