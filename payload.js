// const electron = require('electron');
const {ipcRenderer} = electron;

const form = document.querySelector('form');
form.addEventListener('sbumit', submitForm);

function submitForm(e){
    e.preventDefault();
    console.log(123);
}