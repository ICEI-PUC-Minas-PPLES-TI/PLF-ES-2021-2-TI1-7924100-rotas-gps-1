var db = JSON.parse(localStorage.getItem('db_quests'));
var init = true;

function mostraPergunta(id, classNome) {
    const btnAddMais = document.querySelector('#adicionar_mais');
    btnAddMais.classList.add('hidden');

    const btnMostraTudo = document.createElement('button');
    btnMostraTudo.id = 'btn-voltar';
    btnMostraTudo.innerHTML = `<i class="fas fa-arrow-left"></i>`;

    const titulo_botao = document.querySelector('.titulo_botao');
    titulo_botao.appendChild(btnMostraTudo);

    const substring = classNome.substring(14);

    $("#conteudo_discussao").html("");
    $("#historico").html("");

    const discus = db.data.map(obj => obj.question.id);

    for (var i = 0; i < db.data.length; i++) {
        let info = db.data[i].question;

        if ((discus[i] == id) && (i == substring)) {
            $("#conteudo_discussao").append(`<div class="perguntaLinha-${i}" id="${info.id}">
                                                <div class="tituloData">
                                                    <h5 class="tituloPergunta">${info.titulo_pergunta}</h5>
                                                    <span class="data">${info.date}</span>
                                                </div>         
                                                <p id="show-p1-pergunta">${info.nickname}</p>
                                                <p id="show-p2-pergunta">${info.texto}</p>
                                                <div class="hudBtns"></div> 
                                            </div>`);
            btnParaLogado(id);
        }
    }

    // Criar um título para a área de perguntas
    const tituloResps = document.createElement('h3');
    tituloResps.innerText = 'Respostas';

    // Criar lista para as respostas
    const listResps = document.createElement('ul');
    listResps.className = 'respContent';

    if (init) {
        // Criar um elemento que armazenará a lista de respostas
        const areaResps = document.createElement('div');
        areaResps.className = 'respostas';

        // Colocando essa div na página
        const perguntas = document.querySelector('div.perguntas');
        perguntas.appendChild(areaResps);
        init = false;
    }

    const areaResps = document.querySelector('.respostas');

    // Afilhando o título da área de respostas e a lista dentro da div
    areaResps.appendChild(tituloResps);
    areaResps.appendChild(listResps);

    loadAnswers(substring);

    btnMostraTudo.addEventListener('click', function() { mostraTudo() });
}

function loadAnswers(substring) {
    // Armazena todas as perguntas da respectiva pergunta em uma variável
    const resps = db.data[substring].resp;

    if (resps.length == 0) {
        const tituloResps = document.querySelector('.respostas');
        const mnsgResps = document.createElement('p');
        mnsgResps.className = 'mnsgemRepos';
        mnsgResps.innerText = 'Não há respostas';

        tituloResps.appendChild(mnsgResps);
    }

    // Limpar a área das respostas para que seja gerada uma nova
    $(".respContent").html("");

    // Lista todas as respostas da respectiva pergunta
    for (var i = 0; i < resps.length; i++) {
        let info = db.data[substring].question;
        let respId = db.data[substring].resp;

        if (userLogin != undefined) {
            if (userLogin.id == respId[i].respId) {
                $(".respContent").append(`<li class="resposta-${i}" id="${respId[i].respId}" data-bs-dismiss="modal" data-bs-target="#modalEditarResposta" data-bs-toggle="modal">
                                            <div class="tituloData">
                                                <h4 class="nomeUser">${userLogin.nome}</h4>
                                                <span class="data">${respId[i].date}</span>
                                            </div>
                                            <p class="contentResp">${resps[i].content}</p>
                                        </li>`);
            } else {
                $(".respContent").append(`<li class="resposta-${i}" id="${info.id}">
                                            <div class="tituloData">
                                                <h4 class="nomeUser">${resps[i].name}</h4>
                                                <span class="data">${respId[i].date}</span>
                                            </div> 
                                            <p class="contentResp">${resps[i].content}</p>
                                    </li>`);
            }
        } else {
            $(".respContent").append(`<li class="resposta-${i}" id="${info.id}">
                                            <div class="tituloData">
                                                <h4 class="nomeUser">${resps[i].name}</h4>
                                                <span class="data">${respId[i].date}</span>
                                            </div> 
                                            <p class="contentResp">${resps[i].content}</p>
                                    </li>`);
        }
    }

    const lineAnswer = document.querySelectorAll('.respContent li');

    const responder = document.querySelector('#responder');
    responder.onclick = () => {
        addResposta(substring);
    }

    // Identifica o id e a classe da pergunta clicada
    for (var j = 0; j < lineAnswer.length; j++) {
        lineAnswer[j].onclick = function(e) {
            var id = $(this).closest('[data-id]');
            editarResp(id.context.className, substring);
        }
    }

}

function mostraTudo() {
    // Remove a classe 'hidden' do botão 'adicionar_mais' para que ele apareça
    const btnAddMais = document.querySelector('#adicionar_mais');
    btnAddMais.classList.remove('hidden');

    // Apaga o botão de voltar para as perguntas
    const btnMostraTudo = document.querySelector('#btn-voltar');
    if (btnMostraTudo != null)
        btnMostraTudo.remove();

    //Limpa todas as informações do Data Base
    $("#conteudo_discussao").html("");
    $("#historico").html("");
    $(".respostas").html("");

    // Popula a lista com os registros do banco de dados
    for (i = 0; i < db.data.length; i++) {
        let data = db.data[i];
        let discus = data.question;

        $("#conteudo_discussao").append(`<li display="block" class="perguntaLinha-${i}" id="${discus.id}">
                                            <div class="tituloData">
                                                <h5 class="tituloPergunta">${discus.titulo_pergunta}</h5>
                                                <span class="data">${discus.date}</span>
                                            </div>        
                                            <p class="p1-pergunta">${discus.nickname}</p>
                                            <p class="p2-pergunta">${discus.texto}</p>
                                        </li>`);
        $("#historico").append(`<option id="historicoPesquisa">${discus.titulo_pergunta}</option>`);
    }

    // Seleciona as li's de todas as perguntas
    const lineQuestion = document.querySelectorAll('#conteudo_discussao li');

    // Identifica o id e a classe da pergunta clicada
    for (var j = 0; j < lineQuestion.length; j++) {
        lineQuestion[j].onclick = function() {
            var id = $(this).closest('[data-id]');
            mostraPergunta(id.context.id, id.context.className);
        }
    }
}

function btnParaLogado(id) {
    if (userLogin != undefined) {
        if (userLogin.id == id) {
            $(".hudBtns").append(`<button onclick="editarModal()" type="submit" id="botao-editar" class="" data-bs-target="#modalEditar" data-bs-toggle="modal">Editar</button>
                                    <button onclick="apagarPergunta()" type="submit" id="apagar-pergunta" class="">Apagar</button>
                                    <button id="reponder-pergunta" class="" data-bs-dismiss="modal" data-bs-target="#modalResponder" data-bs-toggle="modal">Responder</button>`);
        } else
            $(".hudBtns").append(`<button id="reponder-pergunta" class="" data-bs-dismiss="modal" data-bs-target="#modalResponder" data-bs-toggle="modal">Responder</button>`);
    } else
        $(".hudBtns").append(`<button id="reponder-pergunta" class="" data-bs-dismiss="modal" data-bs-target="#modalResponder" data-bs-toggle="modal">Responder</button>`);
}