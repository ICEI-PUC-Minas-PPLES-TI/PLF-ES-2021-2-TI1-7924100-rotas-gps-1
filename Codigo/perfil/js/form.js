const LOGIN_URL = "../Login/login.html";
localStorage.setItem('link', JSON.stringify("../perfil/perfilPrincipal.html"));

function validacaoForm() {
    var asterisco;

    //Verificar os campos do formulário das perguntas individualmente
    const fields = document.querySelectorAll("[required]");

    function validateField(field) {
        //Lógica para verificar se existem erros
        function verifyErrors() {
            let foundError = false;

            for (key in field.validity) {
                if (field.validity[key] && !field.validity.valid)
                    foundError = key;
            }

            return foundError;
        }

        function setCustomMessage(message) {
            if (message) {
                $(field).attr('placeholder', field.placeholder + message);
            }
        }

        return function() {
            if (verifyErrors()) {
                field.style.borderBottom = "2px solid red";

                if (!asterisco) {
                    setCustomMessage("*");
                    asterisco = true;
                }
            } else {
                field.style.borderBottom = "2px solid rgb(0, 201, 0)";
                setCustomMessage();
            }
        }
    }

    function customValidation(event) {
        const field = event.target;
        const validation = validateField(field);
        if (field.placeholder == "Adicionar email" || field.placeholder == "Digite a senha" || field.placeholder == "Digite a senha novamente")
            asterisco = false;
        else asterisco = true;
        validation();
    }

    for (field of fields) {
        field.addEventListener("invalid", event => {
            //Tirar o bubble
            event.preventDefault();

            customValidation(event);
        })

        field.addEventListener("blur", customValidation);
    }
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) { //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else { //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

var usuario = JSON.parse(localStorage.getItem('usuarioCorrente'));
var usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));

function salvaPerfil(event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault();

    //Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // // Verfica se o formulário está preenchido corretamente
    if (!$('#form-configPerfil')[0].checkValidity()) {
        return;
    }

    // Obtem os dados do formulário
    let nome = $("#txt_nome").val();
    let sobrenome = $("#txt_sobrenome").val();
    let address = $("#txt_address").val();
    let email = $("#txt_email").val();
    let userInfos = {
        nome: nome,
        sobrenome: sobrenome,
        address: address,
        email: email
    }

    // Armazenando a senha em uma variável
    let senha = $("#txt_senha").val();

    // Adiciona o usuário no banco de dados, caso a senha tenha sido digitada corretamente
    if (senha == usuario.senha)
        updateUser(userInfos);
    else
        alert("Senha incorreta");
}

function confirmarMudancaSenha(event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault();

    // Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // Obtem os dados do formulário
    let nome = $("#txt_nome").val();
    let sobrenome = $("#txt_sobrenome").val();
    let address = $("#txt_address").val();
    let email = $("#txt_email").val();
    let novaSenha = $('#txt_senha').val();
    let confirmarNovaSenha = $('#txt_confirmar-senha').val();

    // Verfica se o formulário está preenchido corretamente
    if (!$('#form-configPerfil')[0].checkValidity()) {
        if (novaSenha.length <= 8 || novaSenha.length >= 15)
            alert('Senha menor que 8 caracteres');
        else
            alert('Dados incorretos');
        return;
    }

    // Criação de Array q armazena os dados obtidos
    let userInfos = {
        nome: nome,
        sobrenome: sobrenome,
        address: address,
        email: email,
        senha: novaSenha
    }

    // Compara os valores digitados para ver se são iguais
    if (novaSenha == confirmarNovaSenha)
        updateSenha(userInfos);
    else
        alert("Senha incorreta");
}

function mudarSenha() {
    const input = document.querySelector('#txt_confirmar-senha');

    if (!input) {
        // Desabilita todos os outros inputs
        const inputs = document.querySelectorAll('.form-control');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute('required', 'required');
            inputs[i].setAttribute('disabled', 'disabled');
        }

        // Reativa o último input para edição
        const lastInput = document.querySelector('#txt_senha');
        lastInput.removeAttribute('disabled', 'disabled');
        lastInput.setAttribute('required', 'required');

        // Esconde o btn 'Salvar Alterações'
        const btnSalvar = document.querySelector('#profile-button');
        btnSalvar.classList = 'hidden';

        // Adicionar novo input e seus atributos
        const newInput = document.createElement('input');
        newInput.setAttribute('type', "password");
        newInput.setAttribute('placeholder', "Digite a senha novamente");
        newInput.setAttribute('required', 'required');
        newInput.setAttribute('minlength', '8');
        newInput.setAttribute('maxlength', '15');
        newInput.classList = 'form-control';
        newInput.id = 'txt_confirmar-senha';

        // Adicionar os itens criados no form
        const form = document.querySelector('#form-configPerfil');
        form.appendChild(newInput);

        // Mudança do btn change-password para confirmar a mudança
        const btnConfirm = document.querySelector('#change-password');
        btnConfirm.textContent = 'Confirmar';
        btnConfirm.id = 'confirm-password';

        // Associar confirmar mudança de senha ao botao
        document.getElementById('confirm-password').addEventListener('click', confirmarMudancaSenha);
    }
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser() {
    const perfilCorrente = {};
    localStorage.setItem('usuarioCorrente', JSON.stringify(perfilCorrente));
    window.location.href = LOGIN_URL;
}

function updateUser(data) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(usuario.id);

    // Altera os dados do objeto no array
    usuariosJSON.user[index].nome = data.nome,
        usuariosJSON.user[index].sobrenome = data.sobrenome,
        usuariosJSON.user[index].address = data.address,
        usuariosJSON.user[index].email = data.email

    const perfilCorrente = {};
    localStorage.setItem('usuarioCorrente', JSON.stringify(perfilCorrente));

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
    localStorage.setItem('usuarioCorrente', JSON.stringify(usuariosJSON.user[index]));

    //Recarregar a página
    location.reload();
}

function updateSenha(data) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(usuario.id);

    // Altera os dados do objeto no array
    usuariosJSON.user[index].nome = data.nome,
        usuariosJSON.user[index].sobrenome = data.sobrenome,
        usuariosJSON.user[index].address = data.address,
        usuariosJSON.user[index].email = data.email,
        usuariosJSON.user[index].senha = data.senha

    const perfilCorrente = {};
    localStorage.setItem('usuarioCorrente', JSON.stringify(perfilCorrente));

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
    localStorage.setItem('usuarioCorrente', JSON.stringify(usuariosJSON.user[index]));

    //Recarregar a página
    location.reload();
}

// Associar salvamento ao botao
document.getElementById('profile-button').addEventListener('click', salvaPerfil);

// Associar mudar senha ao botao
document.getElementById('change-password').addEventListener('click', mudarSenha);

function alterarPergunta(classNome) {
    // Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // Verfica se o formulário está preenchido corretamente
    if (!$('#form-perguntas-modal')[0].checkValidity()) {
        return;
    }

    // Intercepta o click do botão Alterar
    let campoNome = $("#inputNomeModal").val();
    let campoTitulo = $("#inputTituloModal").val();
    let campoTexto = $("#inputProblemaModal").val();
    let pergunta = {
        nickname: campoNome,
        titulo_pergunta: campoTitulo,
        texto: campoTexto
    }

    const id = classNome.substring(14);

    // Adicionar os novos dados no banco de dados
    updatePergunta(id, pergunta);

    // Recarregar a página
    location.reload();
}

function apagarPergunta() {
    const lineQuestion = document.querySelector('#conteudo_discussao div');

    lineQuestion.onclick = function() {
        var id = $(this).closest('[data-id]');
        deletePergunta(id.context.className);
    }

    // Recarregar a página
    location.reload();
}

function editarResp(classNome, respId) {
    // Adicionar o texto da resposta no input
    $("#inputRespostaEditModal").val($(`.${classNome} .contentResp`).text());

    // Identificar o id da resposta assim q o botão confirmar for pressionado
    const btnConfirmarEdicaoResposta = document.querySelector('#btnConfirmarEdicaoResposta');

    // Evento click do botão e chamada de função
    btnConfirmarEdicaoResposta.onclick = function() {
        // Faz a verificação individual de cada campo do formulário
        validacaoForm();

        // Verfica se o formulário está preenchido corretamente
        if (!$('#form-RespostaEdit-modal')[0].checkValidity()) {
            return;
        }

        // Captura do texto da nova resposta
        const novaResp = $("#inputRespostaEditModal").val();
        updateResposta(classNome, novaResp, respId);

        // Atualiza o conteúdo da resposta
        document.querySelector(`.${classNome} p.contentResp`).textContent = $("#inputRespostaEditModal").val();
    }

    const btnApagar = document.querySelector('#btnApagarResposta');

    btnApagar.onclick = function() {
        apagarResp(classNome, respId);
    }
}

function apagarResp(classNome, respId) {
    deleteResp(classNome, respId);
    const lineResp = document.querySelector(`.${classNome}`);
    lineResp.remove();

    const lineAnswer = document.querySelectorAll('.respContent li');

    if (lineAnswer.length < 1) {
        const tituloResps = document.querySelector('.respostas');
        const mnsgResps = document.createElement('p');
        mnsgResps.className = 'mnsgemRepos';
        mnsgResps.innerText = 'Não há mais respostas';

        tituloResps.appendChild(mnsgResps);
    } else {
        // Atribuir uma nova classe para os itens da lista
        for (var i = 0; i < lineAnswer.length; i++) {
            lineAnswer[i].className = `resposta-${i}`;
        }
    }
}