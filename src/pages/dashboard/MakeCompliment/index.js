import React, {useState, useEffect} from 'react';
import {Select, Button, TextField, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { listTags, listUsers } from '../../../helpers/apiHandler';
import { sendCompliment } from '../../../helpers/apiHandler';

import Loader from '../../components/Loader';

export default function MakeCompliment(props) {

  const [users, setUsers] = useState(null);
  const [tags, setTags] = useState(null);
  const [tag, setTag] = useState('');
  const [user, setUser] = useState(props.userId);
  const [message, setMessage] = useState('');

  const submitCompliment = (ev) => {
    ev.preventDefault();
    const callback = result => {
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Elogio enviado!");
        setTag("");
        setUser("");
        setMessage("");
      }
    };
    sendCompliment(tag, user, message, callback);
  };

  useEffect(()=>{
    listUsers((result) => setUsers(result));
  }, []);

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    select: {
      marginRight: theme.spacing(2),
      minWidth: 300,
    },
    message: {
      marginRight: theme.spacing(2),
      minWidth: 620,
    },
  }));

  const classes = useStyles();
  
  const TagsSelect = ({tagsData}) => {
    return  <FormControl className={classes.select}>
    <InputLabel>Tag</InputLabel>
    <Select
      required
      value={tag}
      onChange={handleTagChange}
    >
      {tagsData.map(({id, name_custom}) =><MenuItem key={id} value={id}>{name_custom}</MenuItem>)}
    </Select>
  </FormControl>
  };

  const UsersSelect = ({usersData}) => {
    return  <FormControl className={classes.select}>
    <InputLabel>Usuário</InputLabel>
    <Select
      required
      value={user}
      onChange={handleUserChange}
    >
      {usersData.map(({id, name, email}) =><MenuItem key={id} value={id}>{name} ({email})</MenuItem>)}
    </Select>
  </FormControl>
  };

  useEffect(()=>{
    const callback = result => {
      setTags(result.map(({id, name_custom})=>({id, name_custom})));
    };
    listTags(callback);
  }, []);

  return <form onSubmit={submitCompliment}>
    {tags !== null && user !== null ? <>
      <UsersSelect usersData={users}/>
      <TagsSelect tagsData={tags}/><br/>
      <TextField
      className={classes.message}
      value={message}
      onChange={(ev)=>setMessage(ev.target.value)}
      required
      label="Mensagem"
      /><br/><br/>
      <Button variant="contained" type="submit" color="primary">Enviar!</Button>
    </> : <Loader/>}
  </form>;
};