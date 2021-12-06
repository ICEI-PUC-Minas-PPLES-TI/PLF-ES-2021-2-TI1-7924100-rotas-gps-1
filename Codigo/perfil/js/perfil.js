// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var user = JSON.parse(localStorage.getItem('usuarioCorrente'));

window.addEventListener('load', function() {
    perfil(user);
    exibePerfil(user);
});


function perfil(data) {
    $('#perfil').append(`<!--Imagem do perfil-->
                        <img src="img/perfil-sem-foto.png" id="avatar_img" title="Foto de Perfil">

                        <!--Texto e Redes do perfil-->
                        <div class="infosPerfil">
                            <!--Texto-->
                            <div class="texto_perfil">
                                <h2 title="Nome de usuário">${data.nome} ${data.sobrenome}</h2>
                            </div>

                            <div class="infos">
                                <div id="location">
                                    <span><i class="fas fa-map-marker-alt"></i> Localização</span>
                                    : ${data.address}
                                </div>
                                <div id="email">
                                    <span><i class="fas fa-envelope"></i> Email</span>
                                    : ${data.email}
                                </div>
                            </div>
                        </div>`);

    const location = document.querySelector('#location');

    // Verifica a existência do endereço do usuário. Se não existir, essa informação não aparece no perfil do usuário
    if ((data.address == undefined) || (data.address == ''))
        location.classList.add('hidden');
    else if (location.classList.contains('hidden'))
        location.classList.remove('hidden');
}

function exibePerfil(user) {
    // Armazena os valores do user em variáveis
    let nome = `${user.nome}`;
    let sobrenome = `${user.sobrenome}`;
    let email = `${user.email}`;
    let address = `${user.address}`

    // Substitui as linhas do corpo dos inputs
    $('#txt_nome').val(nome);
    $('#txt_sobrenome').val(sobrenome);
    $('#txt_email').val(email);

    // Verifica se o atributo tem alguma informação. Caso contrário, no input para o enderço não é preenchido
    if ((address != undefined) || (address != null) || (address != ''))
        $('#txt_address').val(address);
}