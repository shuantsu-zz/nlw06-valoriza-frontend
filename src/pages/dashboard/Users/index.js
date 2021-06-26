import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { listUsers } from '../../../helpers/apiHandler';

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

let key = 0;
function createData({id, name, email, admin, created_at}) {
  key += 1;
  return { key, id, name, email, admin, created_at };
}

function SimpleTable(props) {
  const { classes, changeTab, setUserId } = props;

  const [users, setUsers] = useState(null);

  useEffect(()=>{
    listUsers(result=>setUsers(result.map(item=>createData(item))));
  }, []);

  const handleClick = (id) => {
    changeTab();
    setUserId(id);
  };

  return (<>
    {users !== null && <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Admin</TableCell>
            <TableCell align="right">Data de cadastro</TableCell>
            <TableCell align="right">Elogiar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(row => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.admin ? "Sim" : "Não"}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleClick(row.id)} variant="contained" color="primary">Elogiar</Button>
                </TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>}</>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);