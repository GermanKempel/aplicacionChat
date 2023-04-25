const socket = io();

// Swal.fire({
//   title: 'Saludos!',
//   text: 'Bienvenido al chat!',
//   icon: 'success',
// });

let user;
const chatbox = document.getElementById("chatBox");

Swal.fire({
  title: 'Bienvenido!',
  text: 'Ingresa tu nombre de usuario',
  input: 'text',
  inputValidator: (value) => {
    return !value && 'Debes ingresar un nombre de usuario!'
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then(result => {
  user = result.value;
});