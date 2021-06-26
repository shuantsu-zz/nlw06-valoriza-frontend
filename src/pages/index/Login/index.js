import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { toast } from 'react-toastify';

import { useHistory } from "react-router-dom";

import { login } from '../../../helpers/apiHandler';

export default function Login() {

  const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const callback = result => {
      if (result.error) {
        toast.error(result.error);
      } else {
        localStorage.setItem('token', result.access_token);
        history.push('/dashboard');
      }
    };
    login(email, password, callback);
  };

  return <>
    <form onSubmit={(ev) => handleSubmit(ev)}>
      <section className="login">
          <div className="content">
            <h2>Já sou usuário</h2>
                <TextField
                required
                value={email}
                type="email"
                name="username"
                id="username"
                onChange={(ev) => setEmail(ev.target.value)}
                label="E-mail" /><br/>
              <TextField
                required
                value={password}
                name="password"
                id="password"
                onChange={(ev) => setPassword(ev.target.value)}
                label="Senha"
                type="password" />
          </div>
          <div className="cta">
            <Button variant="contained" color="primary" type="submit">
              LOGAR
            </Button>
          </div>
        </section>
    </form>
  </>
}