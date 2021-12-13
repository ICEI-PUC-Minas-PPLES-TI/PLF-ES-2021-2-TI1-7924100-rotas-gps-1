const db_stores = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-43.94019193359171, -19.92140313703567]
        },
        "properties": {
            "name": "Shopping Cidade",
            "category": "Shopping Center",
            "description": "Complexo de compras com vários níveis que oferece diversas redes de varejo, uma praça de alimentação e cinema",
            "phoneFormatted": "(31) 3279-1200",
            "address": "Rua dos Tupis, 337 - Centro, Belo Horizonte - MG, 30190-060",
            "open": "09:00",
            "close": "22:00",
            "site": "https://www.shoppingcidade.com.br/"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-43.943150859207805, -19.922749384094434]
        },
        "properties": {
            "name": "Mercado Central de Belo Horizonte",
            "category": "Mercado",
            "description": "Animado mercado indoor com alimentos, artesanato e souvenirs, além de bares e restaurantes informais",
            "phoneFormatted": "(31) 3274-9434",
            "address": "Av. Augusto de Lima, 744 - Centro, Belo Horizonte - MG, 30190-922",
            "open": "08:00",
            "close": "18:00",
            "site": "https://www.mercadocentral.com.br/"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-43.99269862140672, -19.91987315858087]
        },
        "properties": {
            "name": "PUC Minas - Coração Eucarístico",
            "category": "Universidade Particular",
            "description": "",
            "phoneFormatted": "(31) 3319-4444",
            "address": "R. Dom José Gaspar, 500 - Coração Eucarístico, Belo Horizonte - MG, 30535-901",
            "open": "08:00",
            "close": "20:00",
            "site": "https://www.pucminas.br/"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-44.038965351320286, -19.876767142481025]
        },
        "properties": {
            "name": "Shopping Contagem",
            "category": "Shopping Center",
            "description": "Shopping grande e moderno com mais de 200 lojas, restaurantes com culinária do mundo todo e um cinema com 8 salas",
            "phoneFormatted": "(31) 3956-9621",
            "address": "Av. Severino Ballsteros Rodrigues, 850 - Cabral, Contagem - MG, 32110-005",
            "open": "10:00",
            "close": "22:00",
            "site": "https://www.shoppingcontagem.com.br/"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-43.8576611801805, -19.976365915523363]
        },
        "properties": {
            "name": "Parque Ecológico Rego dos Carrapatos",
            "category": "Parque",
            "description": "",
            "phoneFormatted": "(31) 3541-4376",
            "address": "R. Joaquim Eloy de Azevedo, 300 - Olaria, Nova Lima - MG, 34000-000",
            "open": "06:00",
            "close": "21:00",
            "site": ""
        }
    }]
};

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var stores = JSON.parse(localStorage.getItem('db_address'));
if (!stores)
    stores = db_stores;

// Link do perfil do usuário
const LOGIN_URL = "../Login/login.html";
const PERFIL_URL = "../perfil/perfilPrincipal.html";

// Pegar os dados do usuário logado
var userLogin = JSON.parse(localStorage.getItem('usuarioCorrente'));

// Quando todos os elementos da tela carregarem, chama a função de carregaMapa e outras configurações
$(document).ready(function() {
    localStorage.setItem('link', JSON.stringify(""));

    const login = document.querySelector('#loginProfile');
    const trocaPonto = document.querySelector('#lineTrocaPontos');
    const btnMobile = document.querySelector('#btn-mobile');

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
        localStorage.setItem('link', JSON.stringify("../add-endereco/index.html"));
    })

    btnMobile.onclick = () => {
        const nav = document.getElementById("nav");
        nav.classList.toggle('active');
    };

    const tituloAba = document.querySelector('#tituloAba');
    tituloAba.innerText = "KLUG - Mapa";
})

function addMarkers() {
    let i = 0;
    /* For each feature in the GeoJSON object above: */
    for (const marker of stores.features) {
        /* Create a div element for the marker. */
        const el = document.createElement('div');

        /* Assign a unique `id` to the marker. */
        el.id = `marker-${i++}`;


        /* Assign the `marker` class to each marker for styling. */
        el.className = 'marker';

        el.innerHTML = `<i class="fas fa-map-marker-alt" id="markSVG"></i>`;

        /**
         * Create a marker using the div element
         * defined above and add it to the map.
         **/
        new mapboxgl.Marker(el, {
                offset: [0, -23]
            })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

        createPopUp(marker, el.id);

        el.addEventListener('click', () => {
            const id = el.id;

            /* Close all other popups and display popup for clicked store */
            buildLocationInfos(marker, id);
            showSidebar();

            const popUpContent = document.querySelector(`#popUp-${id.replace("marker-", "")}`);
            popUpContent.classList.add('active');
            el.classList.add('active');
        });
    }
}


function buildLocationInfos(marker, markerId) {
    //Limpa todo o conteúdo
    $(".menuLateral").html("");
    const quantMark = document.querySelectorAll('.marker');

    /* Criação dos elementos principais */
    $(".menuLateral").append(`<div class='sidebar' id="sidebar-${markerId.replace("marker-", "")}">
                              <div id='listings' class='listings'>
                                  <div id="titulo">
                                      <h2 id="estabelecimentoNome"></h2>
                                      <p id="categoria"></p>
                                  </div>

                                  <div id="description"></div>

                                  <div class="infos">
                                      <div class="dados" id="address"></div>
                                  </div>
                              </div>
                          </div>
                      
                          <button id="minimizer" onclick="toggleSidebar()">
                              <i id="btnLateral" class="fas fa-chevron-left"></i>
                          </button>`);

    /* Adicionar o nome do estabelecimento */
    //Cria os elementos da div address
    const estabelecimentoNome = document.getElementById('estabelecimentoNome');
    estabelecimentoNome.innerText = `${marker.properties.name}`;

    //Cria os elementos da div category
    const categoria = document.getElementById('categoria');
    categoria.innerText = `${marker.properties.category}`;

    /* Adicionar Descrição */
    if (marker.properties.description) {
        //Cria a div description
        $("#description").append(`<p class="descricao"></p>`);

        //Insere o texto nela
        const descricao = document.querySelector("#description p.descricao");
        descricao.innerText = `${marker.properties.description}`;
    } else {
        const semDescricao = document.querySelector("#description");
        semDescricao.classList.add('disable');
    }

    /* Adicionar Endereço */
    //Cria os elementos da div address
    $("#address").append(`<i class="fas fa-map-marker-alt"></i><p class="text"></p>`);

    //Insere o texto nela
    const endereco = document.querySelector('#address p.text');
    endereco.innerText = `${marker.properties.address}`;

    /* Adicionar horário de funcionamento */
    //Se houver algum conteúdo no site do JSON, a div site é preenchida
    if (marker.properties.open && marker.properties.close) {
        //Cria a div openingHours
        $(".infos").append(`<div class="dados" id="openingHours"><i class="far fa-clock"></i><p class="text"></p></div>`);
        const funcionamento = document.querySelector('#openingHours p.text');

        //Declaração de variáveis que armazenam o horário atual
        var date = new Date().toLocaleTimeString();
        const open_complete = `${marker.properties.open}` + ":00";
        const close_complete = `${marker.properties.close}` + ":00";

        //Essas variáveis são usadas para testar se o estabelecimento está aberto ou fechado
        if ((date > open_complete) && (date < close_complete))
            funcionamento.innerText = `${marker.properties.open} - ${marker.properties.close} (aberto)`;
        else
            funcionamento.innerText = `Abre às ${marker.properties.open}`;
    }

    /* Adicionar site */
    //Se houver algum conteúdo no site do JSON, a div site é preenchida
    if (marker.properties.site) {
        //Cria o link do site
        $(".infos").append(`<a href="${marker.properties.site}" class="dados" id="site"><i class="fas fa-globe-americas"></i><p class="text"></p></a>`);

        //Insere o texto nela
        const url = `${marker.properties.site}`;
        const site = document.querySelector("#site p.text");
        site.innerText = url.replace("https://www.", "");
    }

    /* Adicionar Telefone */
    //Se houver algum conteúdo no phone do JSON, a div phone é preenchida
    if (marker.properties.phoneFormatted) {
        //Cria os elementos da div phone
        $(".infos").append(`<div class="dados" id="phone"><i class="fas fa-phone-alt"></i><p class="text"></p></div>`);

        //Insere o texto nela
        const phoneNumber = document.querySelector("#phone p.text");
        phoneNumber.innerText = `${marker.properties.phoneFormatted}`;
    }
}

function createPopUp(currentFeature, id) {
    const popup = new mapboxgl.Popup({
            closeOnClick: false
        })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<p id="popUp-${id.replace("marker-", "")}">${currentFeature.properties.name}</p>`)
        .addTo(map);
}

function showSidebar() {
    const sidebar = document.querySelector('#lateralMenu');
    const btnCloseSidebar = document.querySelector('#closeMobile');
    const allMarker = document.querySelectorAll(".marker");
    const allPopUpContent = document.querySelectorAll('.mapboxgl-popup-content p');

    for (let i = 0; i < allMarker.length; i++)
        if (allMarker[i].classList.contains("active")) {
            allMarker[i].classList.remove('active');
            allPopUpContent[i].classList.remove('active');
        }

    if (sidebar.className != 'block') {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('block');
        btnCloseSidebar.classList.remove('hidden');
        btnCloseSidebar.classList.add('block');
    }
}

function hideMenuLateral() {
    const btnSidebar = document.getElementById('minimizer');
    const sidebar = document.querySelector('#lateralMenu');
    const btnCloseSidebar = document.querySelector('#closeMobile');
    const marker = document.querySelector(".marker.active");
    const popUpContent = document.querySelector('.mapboxgl-popup-content p.active');
    const nav = document.getElementById("nav");

    if (!sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('block');
        sidebar.classList.add('hidden');
        btnCloseSidebar.classList.remove('block');
        btnCloseSidebar.classList.add('hidden');

        if (marker)
            marker.classList.remove('active');

        if (popUpContent)
            popUpContent.classList.remove('active');

        if (btnSidebar)
            btnSidebar.classList.add('hidden');
    }

    if (nav.className == 'active')
        nav.classList.remove('active');
}

function toggleSidebar() {
    const btnSidebar = document.getElementById('minimizer');
    const sidebar = document.querySelector('.sidebar');

    btnSidebar.classList.toggle('block');
    sidebar.classList.toggle('hidden');
    sidebar.classList.toggle('block');
}