var db_perguntas = {
    "data": [{
            "question": {
                "id": 1,
                "nickname": "Wellington",
                "date": "15/09/2021",
                "titulo_pergunta": "Como faz para criar um aviso de buraco no mapa?",
                "texto": "Onde eu moro tem muito buraco na rua, e eu queria criar alguns avisos no mapa pra mostrar pras outras pessoas onde eles estão. As únicas opções que eu encontro é de acidente, engarrafamento e pista alagada.",
            },
            "resp": [{
                "respId": 1,
                "name": "Igor Martins",
                "date": "16/09/2021",
                "content": "Tá em edições do mapa, lá vc consegue criar os avisos"
            }]
        },
        {
            "question": {
                "id": 2,
                "nickname": "Cleber",
                "date": "06/10/2021",
                "titulo_pergunta": "Como faz pra mudar a visualização do gráfico da inclinação da rua?",
                "texto": "Sempre que tem uma rua mais inclinada, o site avisa através de um gráfico. Porém eu não entendo ele direito e eu queria mudar a vizualização dele pra outra mais simples."
            },
            "resp": [{
                "respId": 1,
                "name": "Frederico Jorge",
                "date": "09/10/2021",
                "content": "Infelizmente não tem como mudar isso"
            }, {
                "respId": 2,
                "name": "Rafael Fernandinho",
                "date": "11/10/2021",
                "content": "Não tem como mudar. Abraços!!"
            }, {
                "respId": 3,
                "name": "Cleber",
                "date": "14/10/2021",
                "content": "Vlw man, ajudou muito!! Obrigado!!!"
            }]
        },
        {
            "question": {
                "id": 3,
                "nickname": "Luiz",
                "date": "12/10/2021",
                "titulo_pergunta": "Como que faz pra registrar o carro como forma de locomoção?",
                "texto": "Eu comprei um carro novo e queria mudar as formas de transporte pra aparecer apenas carro. O padrão é mostrar todos os meios de transporte, e eu queria mudar isso. Como que faz?"
            },
            "resp": [{
                "respId": 1,
                "name": "Rommel Carneiro",
                "date": "16/10/2021",
                "content": "Lá em configurações do mapa tem essa opção. Basta trocar pra carro e pronto"
            }, {
                "respId": 2,
                "name": "Roberto Felipe",
                "date": "16/10/2021",
                "content": `Em configurações, você clica na opção "Trocar veículo". Depois você escolhe o meio de transporte desejado`
            }]
        },
        {
            "question": {
                "id": 4,
                "nickname": "Andriano",
                "date": "24/10/2021",
                "titulo_pergunta": "Como faço pra tirar as marcações dos lugares do meu mapa",
                "texto": "Outro dia eu tava fazendo uma rota no site e não conseguia ver as ruas no mapa porque tinha muita marcação. Eu não gosto dessas marcações, por isso eu queria tirar. Eu fui nas configurações do mapa mas eu não encontrei nada. Alguém pode me ajudar?"
            },
            "resp": []
        },
        {
            "question": {
                "id": 5,
                "nickname": "Wesley Wagner",
                "date": "13/11/2021",
                "titulo_pergunta": "Como faz pra reportar as rotas erradas?",
                "texto": "Eu moro no interior e toda vez que eu faço um percurso, o site me indica uma rota que toda errada. Eu queria reportar essas rotas para que elas não apareçam mais. Obrigado!!!!"
            },
            "resp": []
        }
    ]
}

// Define a pontuação que o usuário irá ganhar ao adicionar uma pergunta ou resposta. Caso elas sejam apagadas, o usuário perderá esses pontos
const PNTS_Pergunta = 25;
const PNTS_Resposta = 15;

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_quests'));
if (!db) {
    db = db_perguntas;
    localStorage.setItem('db_quests', JSON.stringify(db));
}

// Atribuir os dados do usuários à variáveis para manipulação
var user = JSON.parse(localStorage.getItem('usuarioCorrente'));
var usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));

function insertPergunta(userId, pergunta) {
    let novaPergunta = {
        "question": {
            "id": userId,
            "nickname": user.nome + " " + user.sobrenome,
            "date": pergunta.date,
            "titulo_pergunta": pergunta.titulo_pergunta,
            "texto": pergunta.texto
        },
        "resp": []
    }


    // Insere o novo objeto no array
    db.data.push(novaPergunta);

    // Identifica a posição do JSON do usuário logado
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(userId);

    // Adiciona os pontos por fazer uma pergunta no JSON do usuário
    usuariosJSON.user[index].pontos += PNTS_Pergunta;
    user.pontos += PNTS_Pergunta;

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
    localStorage.setItem('usuarioCorrente', JSON.stringify(user));

    // Limpa o formulario
    $("#form-perguntas")[0].reset();
}

function insertResp(classNome, resposta, userId, newDate) {
    // Criação de um novo objeto para adcicioná-lo no 'db.data.resp' correspondente
    let novaResp = {
        "name": userLogin.nome,
        "date": newDate,
        "respId": userId,
        "content": resposta
    }

    // Obter o id da pergunta correspondete à resposta
    const id = classNome.substring(14);

    // Insere o novo objeto no array
    db.data[id].resp.push(novaResp);

    // Identifica a posição do JSON do usuário logado
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(userId);

    // Adiciona os pontos por responder uma pergunta no JSON do usuário
    usuariosJSON.user[index].pontos += PNTS_Resposta;
    user.pontos += PNTS_Resposta;

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
    localStorage.setItem('usuarioCorrente', JSON.stringify(user));

    // Limpa o formulario
    $("#form-addresposta-modal")[0].reset();
}


function updatePergunta(id, pergunta) {
    // Identifica qual pergunta vai ser editada
    let question = db.data[id].question;

    // Altera os dados do objeto no array
    question.nickname = pergunta.nickname,
        question.titulo_pergunta = pergunta.titulo_pergunta,
        question.texto = pergunta.texto;

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}

function updateResposta(classNome, resposta, respId) {
    const id = classNome.substring(9);

    // Identifica qual pergunta vai ser editada
    let jsonResp = db.data[respId].resp;

    // Altera os dados do objeto no array
    jsonResp[id].content = resposta;

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));
}

function deletePergunta(classNome) {
    const id = classNome.substring(14);

    // Deleta todo o Array selecionado
    db.data.splice(id, 1);

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));

    // Identifica a posição do JSON do usuário logado
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(user.id);

    // Subtrai os pontos por apagar uma pergunta no JSON do usuário
    if (user.pontos > 0) {
        usuariosJSON.user[index].pontos -= PNTS_Pergunta;
        user.pontos -= PNTS_Pergunta;

        // Atualiza os pontos no Local Storage
        localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
        localStorage.setItem('usuarioCorrente', JSON.stringify(user));
    }
}

function deleteResp(classNome, respId) {
    const id = classNome.substring(9);

    // Deleta todo o Array selecionado
    const resposta = db.data[respId].resp;
    resposta.splice(id, 1);

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_quests', JSON.stringify(db));

    // Identifica a posição do JSON do usuário logado
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(user.id);

    // Subtrai os pontos por apagar uma resposta no JSON do usuário
    if (user.pontos > 0) {
        usuariosJSON.user[index].pontos -= PNTS_Resposta;
        user.pontos -= PNTS_Resposta;

        // Atualiza os pontos no Local Storage
        localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
        localStorage.setItem('usuarioCorrente', JSON.stringify(user));
    }
}