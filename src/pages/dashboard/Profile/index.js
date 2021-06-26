import { Button } from '@material-ui/core';
import {React } from "react";

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export default function Profile(props) {
  return <>
    <h4>{parseJwt(localStorage.getItem('token')).email}</h4><br/>
    <Button variant="contained" color="primary" onClick={props.logoff}>Logoff</Button>
  </>
}