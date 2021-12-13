// // importa a chave de credencial de outro arquivo, por motivos de segurança
// import { APIKEY } from "./config.js";

// carrega os dados de coordenadas do localStorage
let strDados = localStorage.getItem("dados");
// declara a variável de coordenadas
let coordenadas = {};

// função que lê as coordenadas
function leCoordenadas() {
    // caso ela já estejam salvas no localStorage, coloca dentro da variável
    if (strDados) {
        coordenadas = JSON.parse(strDados);
    } else {
        // caso não, chama a função que pega as coordenadas
        coordenadas = pegaLocalizacao();
    }

    // retorna as coordenadas, quando é chamada
    return coordenadas;
}

// função que salva as coordenadas do usuário
function salvaCoordenadas(posicao) {
    // pega as coordenadas e salva no localStorage
    localStorage.setItem("dados", JSON.stringify(posicao));

    // chama a função que recarrega a página
    recarregaPagina();
}

// função que pega as coordenadas do usuário
function pegaLocalizacao() {
    // verifica se o navegador suporta geolocalização
    if (navigator.geolocation) {
        // caso sim, chama a função que vai guardar as coordenadas
        navigator.geolocation.getCurrentPosition(myLocation);
    }
    // caso não, mostra um mensagem de erro
    else {
        alert("O seu navegador não suporta Geolocalização.");
        // define um valor para as coordenadas, o centro de BH
        coordenadas = {
            lat: -19.916667,
            lng: -43.933333,
        };

        // salva as coordenadas no localStorage
        salvaCoordenadas(coordenadas);
    }

    // função que guarda as coordenadas do usuário, recebendo a posição como parâmetro
    function myLocation(position) {
        // guarda a posição no objeto de coordenadas
        coordenadas = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        // salva tudo no localStorage
        salvaCoordenadas(coordenadas);
    }
}
// define a posição central do mapa como as coordenadas do usuário
let posicao = leCoordenadas();

// cria o mapa, com estilo próprio feito e com algumas configurações adicionais
mapboxgl.accessToken = 'pk.eyJ1IjoibXBvbG9tYXJ0aW5zIiwiYSI6ImNrdjN0N3MzbzBjem8zMW84cTA0MXo1ZTQifQ.Hqc7dHn824Bv4TSpkH6ZNw';
const map = new mapboxgl.Map({
    // ID do container do map
    container: "map",
    // URL do estilo do mapa, focado para quem dirige
    style: "mapbox://styles/mpolomartins/ckv3szjic4mit14leuvd8rz5a",
    // iniciando com a posição das coordenadas [lng, lat] do usuário, caso tenha
    center: [posicao.lng, posicao.lat],
    // define o zoom do mapa
    zoom: 13, // starting zoom
});

let oneTime = true;

function criarRota() {
    if (oneTime) {
        // Muda a aba do site
        const tituloAba = document.querySelector('#tituloAba');
        tituloAba.innerText = "KLUG - Criar Rota";

        // adiciona o botão de encontrar a localização do usuário
        map.addControl(
            new mapboxgl.GeolocateControl({
                // ativa a opção de alta precisão
                positionOptions: {
                    enableHighAccuracy: true,
                },
                // opção para quando a posição do usuário muda
                trackUserLocation: true,
                // Mostra na tela o raio da precisão da localização e um alfinete onde o usuário está
                showUserHeading: true,
            }),
            // local onde ficará o campo de criar rota
            "bottom-right"
        );

        // adiciona o campo de criar rota no mapa
        map.addControl(
            new MapboxDirections({
                // pega as credenciais usadas anteriormente
                accessToken: mapboxgl.accessToken,
                // define as unidades de medidas em metros
                unit: "metric",
                // define a língua como português brasileiro
                language: "pt-BR",
                // mensagem no local de origem da rota
                placeholderOrigin: "Origem da rota",
                // mensagem no local de destino da rota
                placeholderDestination: "Destino da rota",
                // pede para que o mapa traga mais rotas alternativas
                parameters: {
                    alternatives: true,
                },
            }),
            // local onde ficará o campo de criar rota
            "top-left"
        );
        oneTime = false;
    }
}

// função que recarrega a página, feita assim para não entrar no loop de recarregar
function recarregaPagina() {
    // confere se consegue acessar o localStorage
    if (window.localStorage) {
        // caso sim, confere se já existe a variável salva no localStorage
        if (!localStorage.getItem("recarrega")) {
            // se não tiver, cria a variável e a define como true
            localStorage["recarrega"] = true;
            // recarrega a página
            window.location.reload();
        } else {
            // caso já tenha recarregado a página, tira o item do localStorage
            localStorage.removeItem("recarrega");
        }
    }
}