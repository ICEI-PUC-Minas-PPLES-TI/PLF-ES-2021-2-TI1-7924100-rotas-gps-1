const LOGIN_URL = "../../Login/login.html";
const PERFIL_URL = "../../perfil/perfilPrincipal.html";
var userLogin = JSON.parse(localStorage.getItem('usuarioCorrente'));

function validacaoForm() {
    var asterisco;

    $("#botao_enviar").click(function() {
        // Verfica se o formulário está preenchido corretamente
        if (!$('#form_fale_conosco')[0].checkValidity()) {
            return;
        }

        document.location.reload();
    })

    //Verificar os campos do formulário das perguntas individualmente
    const fields = document.querySelectorAll("[required]");

    function validateField(field) {
        //Lógica para verificar se existem erros
        function verifyErrors() {
            let foundError = false;

            for (key in field.validity) {
                if (field.validity[key] && !field.validity.valid) {
                    foundError = key;
                }
            };
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
        if (field.placeholder == "Primeiro nome" || field.placeholder == "Último nome" || field.placeholder == "Endereço de email" || field.placeholder == "Descreva o problema")
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

function filtroPerguntas() {
    const inputSearch = document.querySelector('#barra-pesquisa input');
    const filterInput = document.querySelector("#search");
    const filterList = document.querySelector('#historico');

    const filterResults = (results, inputValue, returnMatchedResults) => results
        .filter(result => {
            const matchedResults = result.textContent.toLowerCase().includes(inputValue);
            return returnMatchedResults ? matchedResults : !matchedResults;
        })

    const hideResults = (results, inputValue) => {
        filterResults(results, inputValue, false)
            .forEach(result => {
                result.classList.remove('block');
                result.classList.add('hidden');
            })
    }

    const showResults = (results, inputValue) => {
        filterResults(results, inputValue, true)
            .forEach(result => {
                result.classList.remove('hidden');
                result.classList.add('block');
            })
    }

    const handleInputValue = event => {
        const inputValue = event.target.value.trim().toLowerCase();
        const results = Array.from(filterList.children);

        hideResults(results, inputValue);
        showResults(results, inputValue);

    }

    filterList.addEventListener('click', event => {
        const inputValue = event.target.textContent.toLocaleLowerCase();

        filterInput.value = event.target.textContent;
    })

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

function init() {
    //Calcula o ano
    document.querySelector('#ano').innerHTML = new Date().getFullYear();

    const filterSearch = document.querySelector('#historico');
    const inputSearch = document.querySelector('#search');

    function resolveAfterXs(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 100);
        });
    }

    const hideResults = async event => {
        await resolveAfterXs(1);
        const results = Array.from(filterSearch.children).forEach(result => {
            result.classList.remove('block');
            result.classList.add('hidden');
        });
    }

    const showResults = event => {
        const results = Array.from(filterSearch.children).forEach(result => {
            result.classList.remove('hidden');
            result.classList.add('block');
        });
    }

    inputSearch.addEventListener('click', showResults);
    inputSearch.addEventListener('blur', hideResults);

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

    document.querySelector('#barra-pesquisa').addEventListener('submit', () => {
        inputSearch.value.toLocaleLowerCase();
    })

    login.addEventListener('click', function() {
        localStorage.setItem('link', JSON.stringify("../suporte/perguntas/perguntas.html"));
    })
}