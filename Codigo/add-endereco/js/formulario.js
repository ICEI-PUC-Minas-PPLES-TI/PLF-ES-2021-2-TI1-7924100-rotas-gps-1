const LOGIN_URL = "../Login/login.html";
const PERFIL_URL = "../perfil/perfilPrincipal.html";
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
        if (field.placeholder == "Adicionar nome" || field.placeholder == "Adicionar endereço" || field.placeholder == "Adicionar telefone")
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

function adicionarEndereco() {
    if ((userLogin == undefined) || (userLogin == null)) {
        alert("Faça o login para adicionar uma pergunta");
        window.location.replace(LOGIN_URL);
    } else {
        //Faz a verificação individual de cada campo do formulário
        validacaoForm();

        // // Verfica se o formulário está preenchido corretamente
        if (!$('#form-enderecos')[0].checkValidity()) {
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoName = $("#inputName").val();
        let campoCategory = $("#inputCategory").val();
        let campoDescription = $("#inputDescription").val();
        let campoPhoneFormatted = $("#inputPhone").val();
        let campoAddress = $("#inputAddress").val();
        let campoOpen = $("#inputOpen").val();
        let campoClose = $("#inputClose").val();
        let campoSite = $("#inputSite").val();
        let infos = {
            name: campoName,
            category: campoCategory,
            description: campoDescription,
            phoneFormatted: campoPhoneFormatted,
            address: campoAddress,
            open: campoOpen,
            close: campoClose,
            site: campoSite,
            id: userLogin.id
        }

        //Adicionar a nova pergunta no banco de dados
        insertAddress(infos);

        //Recarregar a página
        location.reload();
    }
}

function alterarEndereco() {
    //Faz a verificação individual de cada campo do formulário
    validacaoForm();

    // Verfica se o formulário está preenchido corretamente
    if (!$('#form-editarEnderecos')[0].checkValidity()) {
        return;
    }

    // Intercepta o click do botão Alterar
    let campoName = $("#inputNameEdit").val();
    let campoCategory = $("#inputCategoryEdit").val();
    let campoDescription = $("#inputDescriptionEdit").val();
    let campoPhoneFormatted = $("#inputPhoneEdit").val();
    let campoAddress = $("#inputAddressEdit").val();
    let campoOpen = $("#inputOpenEdit").val();
    let campoClose = $("#inputCloseEdit").val();
    let campoSite = $("#inputSiteEdit").val();
    let endereco = {
        name: campoName,
        category: campoCategory,
        description: campoDescription,
        phoneFormatted: campoPhoneFormatted,
        address: campoAddress,
        open: campoOpen,
        close: campoClose,
        site: campoSite
    }

    const sidebarId = document.querySelector('.sidebar').id;

    //Adicionar os novos dados no banco de dados
    updateAddress(sidebarId.replace("sidebar-", ""), endereco);

    //Recarregar a página
    location.reload();
}

function apagarEndereco() {
    const sidebarId = document.querySelector('.sidebar').id;

    // Apaga os dados da pergunta no banco de dados
    deleteAddress(sidebarId.replace("sidebar-", ""));

    // Recarregar a página
    location.reload();
}

function editarEndereco(id) {
    const properties = stores.features[id].properties;

    const site = $("#site p.text").text()
    const url = "https://www."

    //Preenche os campos do modal para possível edição
    $("#inputNameEdit").val($("#estabelecimentoNome").text());
    $("#inputCategoryEdit").val($("#categoria").text());
    $("#inputDescriptionEdit").val($("#description p.descricao").text());
    $("#inputPhoneEdit").val($("#phone p.text").text());
    $("#inputAddressEdit").val($("#address p.text").text());
    $("#inputOpenEdit").val(properties.open);
    $("#inputCloseEdit").val(properties.close);
    if (!!document.getElementById("site"))
        $("#inputSiteEdit").val(url + site);
    else
        $("#inputSiteEdit").val("");
}

const btnMobile = document.getElementById('btn-mobile');