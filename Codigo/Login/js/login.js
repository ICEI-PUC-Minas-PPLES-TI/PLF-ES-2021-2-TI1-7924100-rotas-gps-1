// Página inicial de Login
const LOGIN_URL = "login.html";

// função para gerar códigos randômicos a serem utilizados como código de usuário
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

var usuarioCorrente = JSON.parse(localStorage.getItem("usuarioCorrente"));
if (!usuarioCorrente)
  usuarioCorrente = {
    id: "",
    username: "",
    nome: "",
    sobrenome: "",
    senha: "",
    email: "",
    endereco: "",
    pontos: 0,
  };

// Obtem a string JSON com os dados de usuários a partir do localStorage
var usuariosJSON = JSON.parse(localStorage.getItem("db_usuarios"));
if (!usuariosJSON) {
  usuariosJSON = {
    user: [
      {
        id: "",
        username: "",
        nome: "",
        sobrenome: "",
        senha: "",
        email: "",
        endereco: "",
        pontos: 0,
      },
    ],
  };
  localStorage.setItem("db_usuarios", JSON.stringify(usuariosJSON));
}

// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser(username, senha) {
  // Para localizar o usuário informado no formulario de login
  for (var i = 0; i < usuariosJSON.user.length; i++) {
    var usuario = usuariosJSON.user[i];

    // Se encontrou login, carrega usuário corrente e salva no Session Storage
    if (username == usuario.username && senha == usuario.senha) {
      console.log("username =", username, "senha =", senha);
      usuarioCorrente.id = usuario.id;
      usuarioCorrente.username = usuario.username;
      usuarioCorrente.nome = usuario.nome;
      usuarioCorrente.sobrenome = usuario.sobrenome;
      usuarioCorrente.email = usuario.email;
      usuarioCorrente.senha = usuario.senha;
      usuarioCorrente.endereco = usuario.endereco;
      usuarioCorrente.pontos = usuario.pontos;

      // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
      localStorage.setItem("usuarioCorrente", JSON.stringify(usuarioCorrente));

      // Retorna true para usuário encontrado
      return true;
    }
  }

  return false;
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser() {
  usuarioCorrente = {};
  localStorage.setItem("usuarioCorrente", JSON.stringify(usuarioCorrente));
  window.location.href = LOGIN_URL;
}

function addUser(username, nome, sobrenome, senha, email) {
  // Cria um objeto de usuario para o novo usuario
  let newId = generateUUID();
  let usuario = {
    id: newId,
    username: username,
    nome: nome,
    senha: senha,
    sobrenome: sobrenome,
    email: email,
    foto: "",
    pontos: 0,
  };

  // Insere o novo objeto no array
  usuariosJSON.user.push(usuario);

  // Salva o novo banco de dados com o novo usuário no localStorage
  localStorage.setItem("db_usuarios", JSON.stringify(usuariosJSON));
  localStorage.setItem("usuarioCorrente", JSON.stringify(usuariosJSON));
}
