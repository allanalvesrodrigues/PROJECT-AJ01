const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const telefone = document.getElementById("telefone").value.trim();

  const usuario = {
    nome: nome,
    email: email,
    senha: senha,
    telefone: telefone
  };

  const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioExistente = usuariosSalvos.find(function (usuarioSalvo) {
    return usuarioSalvo.email === email;
  });

  if (usuarioExistente) {
    mostrarMensagem("Este email já está cadastrado no sistema.", "erro");
    return;
  }

  usuariosSalvos.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

  mostrarMensagem("Cadastro realizado com sucesso!", "sucesso");

  form.reset();

  setTimeout(function () {
    window.location.href = "index.html";
  }, 2000);
});

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem-feedback";

  if (tipo === "sucesso") {
    mensagem.classList.add("mensagem-sucesso");
  }

  if (tipo === "erro") {
    mensagem.classList.add("mensagem-erro");
  }
}