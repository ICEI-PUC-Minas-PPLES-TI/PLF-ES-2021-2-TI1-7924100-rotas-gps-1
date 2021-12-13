const db = JSON.parse(localStorage.getItem('db_quests'));
let oneTime;

function loadQuestions(user) {
    oneTime = true;
    // Inicializa a variável para contar a quantidade de perguntas feitas pelo usuário
    var quantQuestions = 0;

    if (db) {
        // Lista todas as respostas da respectiva pergunta
        for (var i = 0; i < db.data.length; i++) {
            // Armazena todas as perguntas da respectiva pergunta em uma variável
            const questions = db.data[i].question;

            // Lista todas as perguntas do localStorage cujo id seja igual ao do usuário logado
            if (questions) {
                if (user != undefined) {
                    if (user.id == questions.id) {
                        $(".questContent").append(`<li class="perguntaLinha-${i}" id="${questions.id}">
                                                        <a href="">
                                                            <div class="tituloData">
                                                                <h5 class="tituloPergunta">${questions.titulo_pergunta}</h5>
                                                                <span class="data">${questions.date}</span>
                                                            </div>        
                                                            <p class="p1-pergunta">${questions.nickname}</p>
                                                            <p class="p2-pergunta">${questions.texto}</p>
                                                        </a>
                                                    </li>`);

                        // Conta a quantidade de perguntas e respostas que o usuário já fez
                        quantQuestions++;

                        // Criar um atributo para a url
                        const queryString = questions.titulo_pergunta;

                        // Atribuir ao elemento 'a' de cada 'li', um link para a pergunta correspondente na página de suport com o atributo criado
                        const linkPergunta = document.querySelector(`.perguntaLinha-${i} a`)
                        linkPergunta.setAttribute('href', `https://icei-puc-minas-pples-ti.github.io/PLF-ES-2021-2-TI1-7924100-rotas-gps-1/Codigo/suporte/perguntas/perguntas.html?search=${queryString}`);
                        linkPergunta.setAttribute('target', '_blank');
                        linkPergunta.setAttribute('title', `${questions.titulo_pergunta}`);
                    }
                }

            }
        }
    }

    if (!quantQuestions) {
        const tituloPergs = document.querySelector('.perg');
        const mnsgPergs = document.createElement('p');
        mnsgPergs.className = 'mnsgemRepos';
        mnsgPergs.innerText = 'Você não tem perguntas';

        tituloPergs.appendChild(mnsgPergs);
    }

    // Mostra a quantidade de perguntas e respostas que o usuário já fez
    document.querySelector('.quantQuestions').innerText = quantQuestions;
}

function loadAnswers(user) {
    oneTime = true;
    // Inicializa a variável para contar a quantidade de perguntas feitas pelo usuário
    var quantResps = 0;

    if (db) {
        // Lista todas as respostas da respectiva pergunta
        for (var i = 0; i < db.data.length; i++) {
            // Armazena todas as perguntas da respectiva pergunta em uma variável
            const resps = db.data[i].resp;

            // Lista todas as respostas de todas as perguntas do localStorage cujo id seja igual ao do usuário logado
            if (resps) {
                if (user != undefined) {
                    for (var j = 0; j < resps.length; j++) {
                        if (user.id == resps[j].respId) {
                            $(".respContent").append(`<li class="resposta-${i}" id="${resps[j].respId}">
                                                        <div class="tituloData">
                                                            <h4 class="nomeUser">${user.nome}</h4>
                                                            <span class="data">${resps[j].date}</span>
                                                        </div>
                                                        <p class="contentResp">${resps[j].content}</p>
                                                    </li>`);

                            // Conta a quantidade de perguntas e respostas que o usuário já fez
                            quantResps++;
                        }
                    }
                }
            }
        }
    }

    if (!quantResps) {
        const tituloResps = document.querySelector('.resps');
        const mnsgResps = document.createElement('p');
        mnsgResps.className = 'mnsgemRepos';
        mnsgResps.innerText = 'Você não tem respostas';

        tituloResps.appendChild(mnsgResps);
    }

    // Mostra a quantidade de perguntas e respostas que o usuário já fez
    document.querySelector('.quantAnswers').innerText = quantResps;
}