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
  socket.emit("authenticated", user);
});

chatbox.addEventListener("keyup", evt => {
  if (evt.key === "Enter") {
    if (chatbox.value.trim().lenght > 0) {
      socket.emit("message", { user, message: chatbox.value });
      chatbox.value = "";
    }
  }
});

socket.on("messageLogs", data => {
  let log = document.getElementById("messageLogs");
  let messages = '';
  data.forEach(message => {
    messages += `${message.user}dice: ${message.message}<br/>`;
  });
  log.innerHTML = messages;
});

socket.on("newUserConnected", data => {
  Swal.fire({
    taost: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    title: `El usuario ${data} se ha conectado al chat!`,
    icon: 'success',
  });
});