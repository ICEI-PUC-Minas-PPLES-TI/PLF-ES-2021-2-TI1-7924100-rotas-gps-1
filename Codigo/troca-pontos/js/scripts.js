let produtosTroca = [{
        imagem: "./imgs/cinema.jpg",
        titulo: "R$ 5,00 de desconto em cinemas",
        descricao: "Tenha descontos para assistir seus filmes favoritos",
        preco: 40,
    },
    {
        imagem: "./imgs/ingresso.jpg",
        titulo: "Sorteio par de ingressos",
        descricao: "Participe do sorteio de um par de ingressos para ver Transformers",
        preco: 20,
    },
    {
        imagem: "./imgs/gift-card-music.jpg",
        titulo: "Gift Card de R$10",
        descricao: "Troque seus pontos por um gift card de R$10 em seu serviço de streaming de música favorito",
        preco: 60,
    },
    {
        imagem: "./imgs/bike.jpg",
        titulo: "Desconto de R$10 em serviços de bike",
        descricao: "Troque seus pontos por desconto em serviços de mobilidade urbana que usem bikes. Além de fazer bem para a saúde, ajuda o meio ambiente.",
        preco: 20,
    },
    {
        imagem: "./imgs/pet.jpg",
        titulo: "Banho no seu pet",
        descricao: "Troque seus pontos por um banho em seu pet. As pets shops são parceiras de nossa plataforma e irão tratar seu amigo com muito carinho.",
        preco: 400,
    },
];

// Atribuir os dados do usuários à variáveis para manipulação
var userLogin = JSON.parse(localStorage.getItem('usuarioCorrente'));
var usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));

// função que lê os dados do localStorage
// function leDados() {
//     // pega os dados do localStorage
//     let strDados = localStorage.getItem("usuarioCorrente");
//     // cria o objeto de dados
//     let dadosUser = {};

//     // confere se existe algo no localStorage
//     if (strDados) {
//         // caso tenha, coloca dentro da variável de dados
//         dadosUser = JSON.parse(strDados);
//     } else {
//         // caso não tenha, cria o próprio objeto com os dados
//         dadosUser = {
//             email: "nickzada@gmail.com",
//             id: "977d97ac-890b-4e20-88c5-902580136c81",
//             nome: "Nícolas",
//             pontos: 600,
//             senha: "12345678",
//             sobrenome: "Carneiro",
//             username: "admin1234",
//             foto: "https://www.placecage.com/300/300"
//         };
//     }

//     // chama a função que salva os dados do localStorage
//     salvaDados(dadosUser);

//     // retorna o objeto, quando é chamada
//     return dadosUser;
// }

// função que salva os dados no localStorage
function salvaDados(dados, valorAtual) {
    // salva os dados passados por parâmetro no localStorage
    localStorage.setItem("usuarioCorrente", JSON.stringify(dados));

    // Identifica a posição do JSON do usuário logado
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(userLogin.id);

    // Atualiza a pontuação do user
    usuariosJSON.user[index].pontos = valorAtual;

    // Salva essa nova pontuação no JSON de cadastro dos usuários
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
}

// função que imprime os dados na tela
function imprimeDados() {
    // pega algumas informações do usuário no HTML da página
    let nomeUsuario = document.getElementById("nome-usuario");
    let fotoUsuario = document.getElementById("foto-usuario");
    let pontosUsuarios = document.getElementById("pontos-usuario");

    // pega o container dos itens para troca
    let containerItens = document.getElementById("container-itens");

    // declara variável que irá receber os itens
    let conteudoTroca = "";

    // define o objeto de dados como o retorno da função de ler dados
    let dadosUser = JSON.parse(localStorage.getItem("usuarioCorrente"));

    // coloca a frase abaixo com o nome do usuário no h1 do HTML
    nomeUsuario.innerHTML = `Olá, ${dadosUser.nome}`;
    // define o caminho da foto do usuário como o salvo no objeto
    // fotoUsuario.src = `${dadosUser.foto}`;
    fotoUsuario.src = `../perfil/img/perfil-sem-foto.png`;
    // carrega os pontos do usuário na tela
    pontosUsuarios.innerHTML = `${dadosUser.pontos} pontos`;

    // executa item por item e salva dentro da variável
    for (let i = 0; i < produtosTroca.length; i++) {
        conteudoTroca += `
            <article class="item">
              <img src=${produtosTroca[i].imagem} alt="Imagem ilustrativa">
              <span>${produtosTroca[i].titulo}</span>
              <p>${produtosTroca[i].descricao}</p>
              <span>Preço: ${produtosTroca[i].preco} pontos</span>
              <button type="button" id="button" class=button-${i}>Trocar</button>
              </article>
    `;
    }

    // coloca a variável no HTML da página
    containerItens.innerHTML = conteudoTroca;

    // pega todos os botões da página
    let botoes = document.querySelectorAll("button[type=button]");

    // adiciona um Event Listener em cada um deles
    $(botoes).click(function(e) {
        const id = e.target.className.substring(7);

        // confere se o valor do item da a troca é maior do que o saldo do usuário
        if (produtosTroca[id].preco > dadosUser.pontos) {
            // caso seja, exibe uma mensagem de alerta avisando o usuário
            alert(
                "Saldo insuficiente para trocar " +
                '"' +
                produtosTroca[id].titulo +
                '"'
            );
        } else {
            // caso tenha saldo, mostra o produto e o valor dele
            alert(
                '"' +
                produtosTroca[id].titulo +
                '"' +
                " trocado por " +
                produtosTroca[id].preco +
                " pontos"
            );

            // chama a função que troca pontos, passando o objeto de dados e a posição do botão
            trocaPontos(dadosUser, id);
        }
    });

    // chama a função que verifica o saldo do usuário
    verificaSaldo(dadosUser, botoes);
}

// função que troca os pontos
function trocaPontos(dados, id) {
    // pega o valor do item a ser trocado
    let valorDescontado = produtosTroca[id].preco;

    // pega o valor de pontos que o usuário tem atualmente
    let valorAtual = dados.pontos;

    // desconta os pontos do usuário do preço da troca
    valorAtual -= valorDescontado;

    // define o valor de pontos do usuário como o novo valor
    dados.pontos = valorAtual;

    // pega o elemento de pontos na tela
    let pontosUsuarios = document.getElementById("pontos-usuario");

    // atualiza no HTML o valor de pontos do usuário
    pontosUsuarios.innerHTML = `${valorAtual} pontos`;

    // chama a função que salva os dados atualizados no localStorage
    salvaDados(dados, valorAtual);

    // chama a função que verifica o saldo do usuário
    verificaSaldo(dados);
}

// função que verifica o saldo do usuário, apenas por questões estéticas
function verificaSaldo(dados) {
    // pega os pontos que o usuário tem atualmente
    let pontos = dados.pontos;

    // confere se o valor dos pontos é menor do que 20 (troca mais barata)
    if (pontos < 20) {
        // se for, define a cor do fundo do card como vermelho, apenas para layout
        document.getElementById("container-pontos").style.backgroundColor =
            "#e92929";
    }
}

function toggleMenu() {
    const nav = document.getElementById("nav");
    const subCabeçalho = document.querySelector(".subCabecalho");
    const main = document.querySelector(".main");
    const footer = document.querySelector(".footer");

    nav.classList.toggle('active');
    subCabeçalho.classList.toggle('active');
    main.classList.toggle('active');
    footer.classList.toggle('active');
}

// \Links para a página de login, caso o user não esteja logado; e para o perfil, caso esteja logado
const LOGIN_URL = "../Login/login.html";
const PERFIL_URL = "../perfil/perfilPrincipal.html";

$(document).ready(function() {
    // Se o user não estiver logado (user = null), a página não carrega e o usuáruio é direcionado para a página de login
    if (!userLogin) {
        // Limpar a página inteira
        $('body').html("");
        // Alerta para o user fazer o login
        alert("Faça o login");
        // Redirecionamento para a página de login
        window.location.replace(LOGIN_URL);
        // Interrompe as outras funções
        return;
    }
    localStorage.setItem('link', JSON.stringify(""));

    const login = document.querySelector('#loginProfile');

    // Se o usuário não estiver logado, no menu aparecerá a palavra "Entrar"
    if (userLogin != undefined) {
        login.innerHTML = userLogin.nome;
        login.setAttribute('href', PERFIL_URL);
    } else {
        login.innerHTML = 'Entrar';
        login.setAttribute('href', LOGIN_URL);
    }

    login.addEventListener('click', function() {
        localStorage.setItem('link', JSON.stringify("../troca-pontos/troca-pontos.html"));
    })
})

// quando todos os itens da tela terminas de ser carregados, chama a função imprimeDados
window.addEventListener("load", imprimeDados);