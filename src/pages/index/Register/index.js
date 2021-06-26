import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import { toast } from 'react-toastify';

import { useHistory } from "react-router-dom";

import { register } from '../../../helpers/apiHandler';

import { login } from '../../../helpers/apiHandler';

export default function Register() {

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (password1 !== password2) {
      toast.error("Senhas são diferentes");
      return;
    }
    const loginCallback = result => {
      localStorage.setItem('token', result);
      history.push('/dashboard');
    };
    const callback = result => {
      if (result.error) {
        toast.error(result.error);
      } else {
        login(email, password1, loginCallback);
      }
    };
    register(name, email, password1, callback);
  };

  return <>
    <form onSubmit={handleSubmit}>
      <section className="register">
          <div className="content">
            <h2>Quero me cadastrar</h2>
            <TextField
            required
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            label="Nome" /><br/>
            <TextField
            required
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            type="email"
            label="E-mail" /><br/>
            <TextField
            required
            value={password1}
            onChange={(ev) => setPassword1(ev.target.value)}
            label="Senha" type="password" /><br/>
            <TextField
            required
            value={password2}
            onChange={(ev) => setPassword2(ev.target.value)}
            label="Confirmar senha" type="password" /><br/>
          </div>
          <div className="cta">
            <Button variant="contained" color="primary" type="submit">
              REGISTRAR
            </Button>
          </div>
      </section>
    </form>
  </>
}