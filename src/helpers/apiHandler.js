const apiUri = 'http://localhost:3000';

export function login(email, password, callback) {
  fetch(apiUri + '/login', {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  }).then(res=>res.json())
  .then(json=>callback(json));
}

export function register(name, email, password, callback) {
  fetch(apiUri + '/users', {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    })
  }).then(res=>res.json())
  .then(json=>callback(json));
}

export function listUsers(callback) {
  fetch(apiUri + '/users', {
    headers: new Headers({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })})
  .then(res=>res.json())
  .then(json=>callback(json));
}

export function listTags(callback) {
  fetch(apiUri + '/tags', {
    headers: new Headers({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })})
  .then(res=>res.json())
  .then(json=>callback(json));
}

export function listReceived(callback) {
  fetch(apiUri + '/users/compliments/receive', {
    headers: new Headers({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })})
  .then(res=>res.json())
  .then(json=>callback(json));
}

export function listSent(callback) {
  fetch(apiUri + '/users/compliments/send', {
    headers: new Headers({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })})
  .then(res=>res.json())
  .then(json=>callback(json));
}

export function sendCompliment(tag_id, user_receiver, message, callback) {
  fetch(apiUri + '/compliments', {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
    body: JSON.stringify({
      tag_id,
      user_receiver,
      message
    })
  }).then(res=>res.json())
  .then(json=>callback(json));
}