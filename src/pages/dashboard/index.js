import React, {useState} from 'react';
import { Button } from '@material-ui/core';

import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Users from './Users';
import MakeCompliment from './MakeCompliment';
import ShowCompliments from './ShowCompliments';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'theme.palette.background.paper',
    display: 'flex',
    height: '100vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [userId, setUserId] = useState('');

  const history = useHistory();

  const logoff = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeTab = () => {
    setValue(1);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Usuários" {...a11yProps(0)} />
        <Tab label="Elogiar" {...a11yProps(1)} />
        <Tab label="Consultar" {...a11yProps(2)} />
        <Tab label="Perfil" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Users changeTab={changeTab} setUserId={setUserId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MakeCompliment userId={userId}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ShowCompliments/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Button variant="contained" color="primary" onClick={logoff}>Logoff</Button>
      </TabPanel>
    </div>
  );
}