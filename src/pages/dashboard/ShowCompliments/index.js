import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

import { listReceived, listSent, listTags, listUsers } from '../../../helpers/apiHandler';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {

  const { classes } = props;
  const [ received, setReceived ] = useState(null);
  const [ sent, setSent ] = useState(null);
  const [ toggle, setToggle ] = useState(true);
  const [ users, setUsers ] = useState(null);
  const [ tags, setTags ] = useState(null);

  function getTagById(id) {
    if (tags !== null) return tags.filter(i=>i.id === id)[0].name_custom;
    return '';
  }

  function getUserById(id) {
    if (users !== null) return users.filter(i=>i.id === id)[0].name;
    return '';
  }

  useEffect(()=>{
    listReceived(result => setReceived(result));
    listSent(result => setSent(result));
    listUsers(result => setUsers(result));
    listTags(result => setTags(result));
  }, []);

  const Body = ({data}) => data.map((row, key) => (
      <TableRow key={key}>
        <TableCell align="right">{toggle ? getUserById(row.user_receiver) :  getUserById(row.user_sender)}</TableCell>
        <TableCell align="right">{getTagById(row.tag_id)}</TableCell>
        <TableCell align="right">{row.message}</TableCell>
        <TableCell align="right">{row.created_at}</TableCell>
      </TableRow>
    ));

  return (<>
    <strong>{toggle ? "Enviados" : "Recebidos"}</strong>
    <Button
      variant="contained"
      color="primary"
      onClick={()=>setToggle(!toggle)}
      style={{marginLeft: '30px'}}>
      {toggle ? "Exibir recebidos" : "Exibir enviados"}
    </Button>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableCell>{toggle ? "Para" : "De"}</TableCell>
          <TableCell align="right">Tag</TableCell>
          <TableCell align="right">Mensagem</TableCell>
          <TableCell align="right">Data de envio</TableCell>
        </TableHead>
        <TableBody>
          {received !== null && sent !== null && <Body data={toggle ? sent : received}/>}
        </TableBody>
      </Table>
    </Paper>
    </>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);