var link = JSON.parse(localStorage.getItem('link'));

function salvaLogin(event) {
    event.preventDefault();

    let oneTime = true;
    //Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // // Verfica se o formulário está preenchido corretamente
    if ($('#newUserForm')[0].checkValidity()) {
        // alert('Dados incorretos');
        event.preventDefault();
        // return;
    }

    // Obtem os dados do formulário
    let usuario = document.getElementById('txt_user').value;
    let nome = document.getElementById('txt_nome').value;
    let sobrenome = document.getElementById('txt_sobrenome').value;
    let email = document.getElementById('txt_email').value;
    let senha = document.getElementById('txt_senha').value;
    let senha2 = document.getElementById('txt_senha2').value;

    // Verifica se não existe um nome de usuário igual no banco de dados
    var usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));
    for (var i = 0; i < usuariosJSON.user.length; i++) {
        // Teste cada nome de usuario já existente com o informado polo usuário
        if (usuario != usuariosJSON.user[i].username) {
            // Adiciona o usuário no banco de dados, caso as senhas estejam corretas
            if (senha == senha2)
                if (oneTime) {
                    oneTime = false;
                    event.preventDefault();
                    addUser(usuario, nome, sobrenome, senha, email);
                } else {
                    alert('As senhas não coincidem');
                    event.preventDefault();
                    return;
                }
        } else {
            alert('Nome de usuário já exisitente');
            event.preventDefault();
            return;
        }
    }
}

function linkBtnEntrar() {
    const btnSalvar = document.querySelector('#salvarLink');
    const inputSenha1 = document.querySelector('#txt_senha');
    const inputSenha2 = document.querySelector('#txt_senha2');

    if (link)
        inputSenha2.oninput = () => {
            if (inputSenha1.value == inputSenha2.value)
                btnSalvar.setAttribute('href', link);
            else
                btnSalvar.setAttribute('href', "");
        }
}

$(document).ready(function() {
    const btnSalvar = document.querySelector('#salvarLink');

    if (link == '' || link == null)
        btnSalvar.setAttribute('href', "../rotas/rotas.html");

    // Associa a funçao processaFormLogin  formulário adicionado um manipulador do evento submit
    document.getElementById('btn_salvar').onclick = salvaLogin;

    // Associar link da página antiga ao botão entrar
    document.getElementById('txt_senha2').addEventListener('focus', linkBtnEntrar);
})