const form = document.getElementById("formCadastro");

const mensagem = document.getElementById("mensagem");
const mensagemTexto = document.getElementById("mensagemTexto");
const mensagemIcone = document.getElementById("mensagemIcone");
const fecharMensagem = document.getElementById("fecharMensagem");

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const telefoneInput = document.getElementById("telefone");

const erroNome = document.getElementById("erroNome");
const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");
const erroTelefone = document.getElementById("erroTelefone");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  limparErros();
  esconderMensagem();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();
  const telefone = telefoneInput.value.trim();

  let formularioValido = true;

  if (nome.length < 3) {
    mostrarErroCampo(nomeInput, erroNome, "Digite um nome com pelo menos 3 caracteres.");
    formularioValido = false;
  } else {
    marcarCampoSucesso(nomeInput);
  }

  if (!validarEmail(email)) {
    mostrarErroCampo(emailInput, erroEmail, "Digite um email válido.");
    formularioValido = false;
  } else {
    marcarCampoSucesso(emailInput);
  }

  if (senha.length < 6) {
    mostrarErroCampo(senhaInput, erroSenha, "A senha deve ter no mínimo 6 caracteres.");
    formularioValido = false;
  } else {
    marcarCampoSucesso(senhaInput);
  }

  if (telefone !== "" && telefone.length < 10) {
    mostrarErroCampo(telefoneInput, erroTelefone, "Digite um telefone válido com DDD.");
    formularioValido = false;
  } else if (telefone !== "") {
    marcarCampoSucesso(telefoneInput);
  }

  if (!formularioValido) {
    mostrarMensagem("Revise os campos destacados antes de continuar.", "erro");
    return;
  }

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
    mostrarErroCampo(emailInput, erroEmail, "Este email já está cadastrado.");
    mostrarMensagem("Já existe uma conta cadastrada com este email.", "erro");
    return;
  }

  usuariosSalvos.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

  mostrarMensagem("Cadastro realizado com sucesso!", "sucesso");
  form.reset();
  limparEstadosVisuais();

  setTimeout(function () {
    window.location.href = "index.html";
  }, 2000);
});

fecharMensagem.addEventListener("click", function () {
  esconderMensagem();
});

function mostrarMensagem(texto, tipo) {
  mensagemTexto.textContent = texto;
  mensagem.className = "mensagem-feedback";

  if (tipo === "sucesso") {
    mensagem.classList.add("mensagem-sucesso");
    mensagemIcone.textContent = "✓";
  }

  if (tipo === "erro") {
    mensagem.classList.add("mensagem-erro");
    mensagemIcone.textContent = "!";
  }
}

function esconderMensagem() {
  mensagem.className = "mensagem-feedback";
  mensagemTexto.textContent = "";
  mensagemIcone.textContent = "";
}

function mostrarErroCampo(input, campoErro, textoErro) {
  input.classList.add("input-erro");
  campoErro.textContent = textoErro;
}

function marcarCampoSucesso(input) {
  input.classList.add("input-sucesso");
}

function limparErros() {
  erroNome.textContent = "";
  erroEmail.textContent = "";
  erroSenha.textContent = "";
  erroTelefone.textContent = "";

  nomeInput.classList.remove("input-erro", "input-sucesso");
  emailInput.classList.remove("input-erro", "input-sucesso");
  senhaInput.classList.remove("input-erro", "input-sucesso");
  telefoneInput.classList.remove("input-erro", "input-sucesso");
}

function limparEstadosVisuais() {
  nomeInput.classList.remove("input-erro", "input-sucesso");
  emailInput.classList.remove("input-erro", "input-sucesso");
  senhaInput.classList.remove("input-erro", "input-sucesso");
  telefoneInput.classList.remove("input-erro", "input-sucesso");
}

function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}