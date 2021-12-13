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

var userLogin = JSON.parse(localStorage.getItem('usuarioCorrente'));
var usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));

/* Assign a unique ID to each store */
stores.features.forEach(function(store, i) {
    if ((userLogin == undefined) || (userLogin == null) || (userLogin == ''))
        store.properties.id = i;
});

map.on('load', () => {
    /* Add the data to your map as a layer */
    map.addSource('places', {
        type: 'geojson',
        data: stores
    });
    addMarkers();

    $('#inputPhone, #inputPhoneEdit').mask("(99) 99999-9999");

    $('.mapboxgl-canvas, #closeMobile').on('click', function() {
        hideMenuLateral();
    })
});

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

    if ((userLogin != null)) {
        if (userLogin.id == marker.properties.id) {
            $("#listings").append(`<button id="changeInfos" data-bs-toggle="modal" data-bs-target="#editarEndereco">
                                    <i class='bx bxs-pencil'></i> <section id="btn-editar">Editar informações</section> 
                                </button>`);
        }
    }

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

    $('#changeInfos').button().click(function() {
        editarEndereco(markerId.replace("marker-", ""));
    });
}

function createPopUp(currentFeature, id) {
    const popup = new mapboxgl.Popup({
            closeOnClick: false
        })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<p id="popUp-${id.replace("marker-", "")}">${currentFeature.properties.name}</p>`)
        .addTo(map);
}

const inputEndereco = $('#inputAddress');
const inputEnderecoEdit = $('#inputAddressEdit');

inputEndereco.on('focus', () => {
    if (!inputEndereco.val()) {
        $("#listAddress").html("");

        for (var i = 0; i < 5; i++)
            $("#listAddress, #listAddressEdit").append(`<option class="listAddressOption${i}"></option>`);
    }
});

inputEndereco.on('input', () => {
    const data = searchAddress();
    data.then(function(result) {
        if (inputEndereco.val())
            if (!(result.find(element => element.place_name == inputEndereco.val())))
                for (var i = 0; i < result.length; i++)
                    $(`.listAddressOption${i}`).html(`${result[i].place_name}`);
    })
});

const searchAddress = async function() {
    const query = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputEndereco.val()}.json?country=br&language=pt&access_token=pk.eyJ1Ijoibmlrb2xhc2xvdXJldCIsImEiOiJja3Z5MWF5aTQ5djUyMnVxMXpwZHFtY3p3In0.tmhesiuf4EmWuiptIuhaAg`, { method: "GET" }
    );
    const json = await query.json();
    const data = json.features;

    return data;
}

inputEnderecoEdit.on('focus', () => {
    $("#listAddressEdit").html("");

    for (var i = 0; i < 5; i++)
        $("#listAddressEdit").append(`<option class="listAddressOptionEdit${i}"></option>`);
});

inputEnderecoEdit.on('input', () => {
    const data = searchAddressEdit();
    data.then(function(result) {
        if (inputEnderecoEdit.val())
            if (!(result.find(element => element.place_name == inputEnderecoEdit.val())))
                for (var i = 0; i < 5; i++)
                    $(`.listAddressOptionEdit${i}`).html(`${result[i].place_name}`);
    })
});

const searchAddressEdit = async function() {
    const query = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputEnderecoEdit.val()}.json?country=br&language=pt&access_token=pk.eyJ1Ijoibmlrb2xhc2xvdXJldCIsImEiOiJja3Z5MWF5aTQ5djUyMnVxMXpwZHFtY3p3In0.tmhesiuf4EmWuiptIuhaAg`, { method: "GET" }
    );
    const json = await query.json();
    const data = json.features;

    return data;
}

const PNTS_AddAddress = 50;

function insertAddress(endereco) {
    const data = searchAddress();
    data.then(function(result) {
        //Descobrir qual o id da pergunt
        const address = result.find(element => element.place_name = inputEndereco.val());

        let coordenadas = address.geometry;

        let newAddress = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": coordenadas.coordinates
            },
            "properties": {
                "name": endereco.name,
                "category": endereco.category,
                "description": endereco.description,
                "phoneFormatted": endereco.phoneFormatted,
                "address": endereco.address,
                "open": endereco.open,
                "close": endereco.close,
                "site": endereco.site,
                "id": endereco.id
            }
        }

        // Insere o novo objeto no array
        stores.features.push(newAddress);

        // Atualiza os dados no Local Storage
        localStorage.setItem('db_address', JSON.stringify(stores));
    })

    // Identifica a posição do JSON do usuário logado
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(userLogin.id);

    // Adiciona os pontos no JSON do usuário por adicionar um novo endereço no mapa
    if (index >= 0) {
        usuariosJSON.user[index].pontos += PNTS_AddAddress;
        userLogin.pontos += PNTS_AddAddress;

        localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
        localStorage.setItem('usuarioCorrente', JSON.stringify(userLogin));
    }
}

function updateAddress(id, endereco) {
    const data = searchAddressEdit();
    data.then(function(result) {
        // Localiza o indice do objeto a ser alterado no array a partir do seu ID
        const features = stores.features;
        const propertiesIndex = features[id].properties;
        const geometry = features[id].geometry;

        //Encontra as coordenadas do enderço pesquisado
        const address = result.find(element => element.place_name = inputEnderecoEdit.val());
        const coordenadas = address.geometry;

        // Altera os dados do objeto no array
        geometry.coordinates = coordenadas.coordinates,
            propertiesIndex.name = endereco.name,
            propertiesIndex.category = endereco.category,
            propertiesIndex.description = endereco.description,
            propertiesIndex.phoneFormatted = endereco.phoneFormatted,
            propertiesIndex.address = endereco.address,
            propertiesIndex.open = endereco.open,
            propertiesIndex.close = endereco.close,
            propertiesIndex.site = endereco.site;

        // Atualiza os dados no Local Storage
        localStorage.setItem('db_address', JSON.stringify(stores));
    })
}

function deleteAddress(id) {
    //Deleta todo o Array selecionado
    stores.features.splice(id, 1);

    // Identifica a posição do JSON do usuário logado
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(userLogin.id);

    // Subtrai os pontos no JSON do usuário por apagar uma endereço cadastrado
    if (index >= 0) {
        if (userLogin.pontos > 0) {
            usuariosJSON.user[index].pontos -= PNTS_AddAddress;
            userLogin.pontos -= PNTS_AddAddress;

            // Atualiza os dados no Local Storage
            localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
            localStorage.setItem('usuarioCorrente', JSON.stringify(userLogin));
        }
    }

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_address', JSON.stringify(stores));

}

function toggleSidebar() {
    const btnSidebar = document.getElementById('minimizer');
    const sidebar = document.querySelector('.sidebar');

    btnSidebar.classList.toggle('block');
    sidebar.classList.toggle('hidden');
    sidebar.classList.toggle('block');
}

function showSidebar() {
    const sidebar = document.querySelector('#lateralMenu');
    const btnCloseSidebar = document.querySelector('#closeMobile');
    const btnAddAddress = document.querySelector("#addAddress");
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
        btnAddAddress.classList.remove('block');
        btnAddAddress.classList.add('hidden');
    }
}

function hideMenuLateral() {
    const btnSidebar = document.getElementById('minimizer');
    const sidebar = document.querySelector('#lateralMenu');
    const btnCloseSidebar = document.querySelector('#closeMobile');
    const btnAddAddress = document.querySelector("#addAddress");
    const marker = document.querySelector(".marker.active");
    const popUpContent = document.querySelector('.mapboxgl-popup-content p.active');
    const nav = document.getElementById("nav");

    if (!sidebar.classList.contains('hidden')) {
        btnAddAddress.classList.remove('hidden');
        btnAddAddress.classList.add('block');
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