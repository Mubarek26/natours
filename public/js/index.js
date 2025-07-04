import '@babel/polyfill';
import { login } from './login.js';

// Values
let email;
let password;

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');
  if (!form) return; // Exit if form doesn't exist
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    login(email, password);
  });
});
