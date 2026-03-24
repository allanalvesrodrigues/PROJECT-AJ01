const formLogin = document.getElementById("formLogin");

const mensagemLogin = document.getElementById("mensagemLogin");
const loginTexto = document.getElementById("loginTexto");
const loginIcone = document.getElementById("loginIcone");
const fecharMensagemLogin = document.getElementById("fecharMensagemLogin");

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();

  esconderMensagemLogin();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(function (usuario) {
    return usuario.email === email && usuario.senha === senha;
  });

  if (!usuarioEncontrado) {
    mostrarMensagemLogin("Email ou senha incorretos.", "erro");
    return;
  }

  mostrarMensagemLogin("Login realizado com sucesso!", "sucesso");

  setTimeout(function () {
    window.location.href = "Dashboard.html";
  }, 1500);
});

fecharMensagemLogin.addEventListener("click", function () {
  esconderMensagemLogin();
});

function mostrarMensagemLogin(texto, tipo) {
  mensagemLogin.className = "mensagem-feedback";
  mensagemLogin.style.display = "flex";
  loginTexto.textContent = texto;

  if (tipo === "erro") {
    mensagemLogin.classList.add("mensagem-erro");
    loginIcone.textContent = "!";
  }

  if (tipo === "sucesso") {
    mensagemLogin.classList.add("mensagem-sucesso");
    loginIcone.textContent = "✓";
  }
}

function esconderMensagemLogin() {
  mensagemLogin.className = "mensagem-feedback";
  mensagemLogin.style.display = "none";
  loginTexto.textContent = "";
  loginIcone.textContent = "";
}