import '@babel/polyfill';
import { login, logout } from './login.js';

// Values
let email;
let password;

// DOM Elements
const form = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}