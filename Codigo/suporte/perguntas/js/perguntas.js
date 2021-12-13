const LOGIN_URL = "../../Login/login.html";
const PERFIL_URL = "../../perfil/perfilPrincipal.html";
var userLogin = JSON.parse(localStorage.getItem('usuarioCorrente'));

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
                field.style.border = "1px solid red";

                if (!asterisco) {
                    setCustomMessage("*");
                    asterisco = true;
                }
            } else {
                field.style.border = "1px solid rgb(0, 201, 0)";
                setCustomMessage();
            }
        }
    }

    function customValidation(event) {
        const field = event.target;
        const validation = validateField(field);
        if (field.placeholder == "Nome" || field.placeholder == "Título da pergunta" || field.placeholder == "Descreva o problema" || field.placeholder == "Responder")
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

function addPergunta() {
    // Se não houver dados, o usuário é redirecionado para a página de login
    if (!(userLogin != undefined)) {
        alert("Faça o login para adicionar uma pergunta");
        window.location.replace(LOGIN_URL);
    } else {
        //Faz a verificação individual de cada campo do formulário
        validacaoForm();

        // Verfica se o formulário está preenchido corretamente
        if (!$('#form-perguntas')[0].checkValidity()) {
            return;
        }

        // Data atual
        let newDate = new Date().toLocaleDateString();

        // Obtem os valores dos campos do formulário
        let campoNome = $("#inputNome").val();
        let campoTitulo = $("#inputTitulo").val();
        let campoTexto = $("#inputProblema").val();
        let pergunta = {
            nickname: campoNome,
            date: newDate,
            titulo_pergunta: campoTitulo,
            texto: campoTexto
        }

        //Adicionar a nova pergunta no banco de dados
        insertPergunta(userLogin.id, pergunta);

        //Recarregar a página
        deleteParamsUrl();
    }
}

const addResposta = (substring) => {
    if (!(userLogin != undefined)) {
        alert("Faça o login para adicionar uma pergunta");
        window.location.replace(LOGIN_URL);
    } else {
        const mnsgemRepos = document.querySelector('.mnsgemRepos');
        if (mnsgemRepos)
            mnsgemRepos.remove();

        //Faz a verificação individual de cada campo do formulário
        validacaoForm();

        // Verfica se o formulário está preenchido corretamente
        if (!$('#form-addresposta-modal')[0].checkValidity()) {
            return
        }

        // Data atual
        let newDate = new Date().toLocaleDateString();

        // Obtem os valores dos campos do formulário
        let respostaContent = $("#inputRespostaModal").val();

        $("#inputRespostaModal").val("");

        const lineQuestion = document.querySelector('#conteudo_discussao div');

        var id = $(lineQuestion).closest('[data-id]');

        // Adicionar a nova pergunta no banco de dados
        insertResp(id.context.className, respostaContent, userLogin.id, newDate);

        loadAnswers(substring);
    }

    console.log(user.pontos)
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
        document.querySelector(`.${classNome} p.contentResp`).innerText = $("#inputRespostaEditModal").val();

        // Limpa o formulario
        $("#form-RespostaEdit-modal")[0].reset();


    }

    const btnApagar = document.querySelector('#btnApagarResposta');

    btnApagar.onclick = function() {
        apagarResp(classNome, respId);
    }
}

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
    deleteParamsUrl();
}

function apagarPergunta() {
    const lineQuestion = document.querySelector('#conteudo_discussao div');

    lineQuestion.onclick = function() {
        var id = $(this).closest('[data-id]');
        deletePergunta(id.context.className);
    }

    // Recarregar a página
    deleteParamsUrl();
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

    console.log(user.pontos)
}

function editarModal() {
    // Preenche os campos do modal para possível edição
    $("#inputNomeModal").val($("#show-p1-pergunta").text());
    $("#inputTituloModal").val($(".tituloPergunta").text());
    $("#inputProblemaModal").val($("#show-p2-pergunta").text());

    const btnConfirmarEdicao = document.querySelector('#confirmar-alteracao');
    const lineQuestion = document.querySelector('#conteudo_discussao div');

    btnConfirmarEdicao.onclick = function() {
        var id = $(lineQuestion).closest('[data-id]');
        alterarPergunta(id.context.className);
    }
}

function filtroPerguntas(resultParam) {
    const inputSearch = document.querySelector('#search');
    const filterList = document.querySelector('#historico');
    const posts = document.querySelectorAll("#conteudo_discussao li");

    const filterResults = (results, inputValue, returnMatchedResults) => results
        .filter(result => {
            const matchedResults = result.textContent.toLowerCase().includes(inputValue);
            return returnMatchedResults ? matchedResults : !matchedResults;
        });

    const hideResults = (results, inputValue) => {
        filterResults(results, inputValue, false)
            .forEach(result => {
                result.classList.remove('block');
                result.classList.add('hidden');
            });
    }

    const showResults = (results, inputValue) => {
        filterResults(results, inputValue, true)
            .forEach(result => {
                result.classList.remove('hidden');
                result.classList.add('block');
            });
    }

    const showPostIfMatchInputValue = inputValue => post => {
        const postTitle = post.querySelector('.tituloPergunta').textContent.toLocaleLowerCase();
        const postBody1 = post.querySelector('.p1-pergunta').textContent.toLocaleLowerCase();
        const postBody2 = post.querySelector('.p2-pergunta').textContent.toLocaleLowerCase();
        const postContainsInputValue = postTitle.includes(inputValue) ||
            postBody1.includes(inputValue) ||
            postBody2.includes(inputValue);

        if (postContainsInputValue) {
            post.style.display = 'block';
            return
        }

        post.style.display = 'none';
    }

    const handleInputValue = event => {
        const inputValue = event.target.value.trim().toLowerCase();
        const results = Array.from(filterList.children);


        posts.forEach(showPostIfMatchInputValue(inputValue));

        hideResults(results, inputValue);
        showResults(results, inputValue);
    }

    filterList.addEventListener('click', event => {
        const inputValue = event.target.textContent.toLocaleLowerCase();

        posts.forEach(showPostIfMatchInputValue(inputValue));

        inputSearch.value = event.target.textContent;
    });

    // Caso haja um resultado na barra de pesquisa, o código irá filtrar automaticamente
    if (resultParam) {
        posts.forEach(showPostIfMatchInputValue(resultParam));
        $('#search').val(resultParam);
    }

    inputSearch.addEventListener('input', handleInputValue);
}
const btnMobile = document.getElementById('btn-mobile');

function toggleMenu() {
    const nav = document.getElementById("nav");
    const main = document.querySelector(".main");
    const footer = document.querySelector(".footer");

    nav.classList.toggle('active');
    main.classList.toggle('active');
    footer.classList.toggle('active');
}

$(document).ready(function() {
    //Calcula o ano
    document.querySelector('#ano').innerHTML = new Date().getFullYear();

    // Função que mostra as perguntas
    mostraTudo();

    // Função que captura o parâmetro 'search' da url para ser utilizada na filtragem das perguntas
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam)
        filtroPerguntas(searchParam.toLocaleLowerCase());

    localStorage.setItem('link', JSON.stringify(""));

    const login = document.querySelector('#loginProfile');
    const trocaPonto = document.querySelector('#lineTrocaPontos');

    // Se o usuário não estiver logado, no menu aparecerá a palavra "Entrar"
    if (userLogin != undefined) {
        login.innerHTML = userLogin.nome;
        login.setAttribute('href', PERFIL_URL);
    } else {
        login.innerHTML = 'Entrar';
        login.setAttribute('href', LOGIN_URL);

        trocaPonto.classList.add("hidden");
    }

    login.addEventListener('click', function() {
        localStorage.setItem('link', JSON.stringify("../../suporte/perguntas/perguntas.html"));
    })

    const btnAddQuestion = document.querySelector('#adicionar_mais');
    btnAddQuestion.addEventListener('click', function() {
        $("#inputNome").val(userLogin.nome);
    })

    console.log(user.pontos)
})

function deleteParamsUrl() {
    var url = window.location.href;
    url = url.split(/[?#]/)[0];
    window.location.replace(url);
}