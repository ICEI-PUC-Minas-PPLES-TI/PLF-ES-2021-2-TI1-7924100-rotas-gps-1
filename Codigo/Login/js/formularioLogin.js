const PERFIL_URL = "../perfil/perfilPrincipal.html";
var link = JSON.parse(localStorage.getItem('link'));

// Declara uma função para processar o formulário de login
function processaFormLogin(event) {
    //Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // Obtem os dados de login e senha a partir do formulário de login
    var username = $('#username').val();
    var password = $('#password').val();

    // Verfica se o formulário está preenchido corretamente
    if (!$('#loginForm')[0].checkValidity()) {
        if (username.length <= 8 || username.length >= 25)
            alert('Nome de usuário menor que 8 caracteres');
        else if (password.length <= 8 || password.length >= 15)
            alert('Senha menor que 8 caracteres');
        else
            alert('Dados incorretos');
        event.preventDefault();
        return;
    }

    // Valida login e se estiver ok, redireciona para tela inicial da aplicação
    if (username && password) {
        resultadoLogin = loginUser(username, password);

        if (!resultadoLogin) {
            // Cancela a submissão do formulário para tratar sem fazer refresh da tela
            event.preventDefault();
            alert('Nome de usuário ou senha incorretos');
        }
    }
}

function linkBtnEntrar() {
    const btnEntrar = document.querySelector('#btn-entrar');
    const inputNome = document.querySelector('#username');
    const inputSenha = document.querySelector('#password');

    if (link)
        inputSenha.oninput = () => {
            if (loginUser(inputNome.value, inputSenha.value))
                btnEntrar.setAttribute('href', link);
            else
                btnEntrar.setAttribute('href', "");
        }
}

$(document).ready(function() {
    const btnEntrar = document.querySelector('#btn-entrar');

    if (link == '' || link == null)
        btnEntrar.setAttribute('href', "../rotas/rotas.html");

    // Associa a funçao processaFormLogin  formulário adicionado um manipulador do evento submit
    document.getElementById('btnEntrar').addEventListener('click', processaFormLogin);

    // Associar link da página antiga ao botão entrar
    document.getElementById('password').addEventListener('focus', linkBtnEntrar);
})