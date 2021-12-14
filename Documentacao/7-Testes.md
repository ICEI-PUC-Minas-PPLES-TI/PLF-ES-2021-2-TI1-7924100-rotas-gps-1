# Avaliação da Aplicação

<span style="color:red">Pré-requisitos: <a href="6-Implementação.md"> Projeto da Solução</a></span>


> - Conexão com a Internet
> - Utilização de um navegador padrâo (Chrome, Opera, Edge, etc)

## Plano de Testes

> Considerando o site funcional e uma conexão com a internet estável do usuário:

## Teste - Cadastro de usuário - RF-010
- Passo a passo:
> - Clicar no botão de registrar usuário
> - nformar os dados de usuário 
conforme orientações da tela
> - Confirmar o registro do usuário
> - Efetuar o login com as 
informações registradas
- Os dados do usuário devem ser registrados no Local Storage

## Teste - Efetuação do Login - RF-011
- Passo a passo:
> - Acessar tela de login
> - Informar um login e senha corretos
> - Confirmar a validação
> - Aguardar o resultado
- Após a confirmação de login, o sistema deverá direcionar o usuário para a página inicial 
de usuário logado


## Teste - Adicionar dúvida (suporte) - RF-003
- Passo a passo:
> - Efetuar o Login
> - Clicar no botão "Adicionar pergunta"
> - Preencher os campos corretamente
> - Clicar no botão "Postar"
- Após postar a nova pergunta, o sistema deverá mostrar na tela inicial a nova pergunta registrada

## Teste - Editar dúvida (suporte) - RF-003
- Passo a passo:
> - Clicar em uma pergunta
- Quando clicado em uma pergunta qualquer, o sistema deverá 
mostrar um modal contendo a pergunta selecionada, com dois 
botões “Editar” e “Apagar”
> - Clicar no botâo "Editar"
> - Preencher os campos corretamente
> - Clicar no botão "Confirmar"
- Ao clicar no botão “Editar”, o sistema deverá 
mostrar um modal com três campos preenchidos com a 
pergunta selecionada, prontos para a edição. Após fazer as 
alterações e clicar no botão “Confirmar”, o sistema deverá 
mostrar na tela inicial a pergunta editada 

## Teste - Apagar dúvida (suporte) - RF-003
- Passo a passo:
> - Clicar em uma pergunta
- Quando clicado em uma pergunta qualquer, o sistema deverá 
mostrar um modal contendo a pergunta selecionada, com dois 
botões “Editar” e “Apagar”
> - Clicar no botâo "Apagar"
- Após clicar no botão “Apagar”, o sistema deverá mostrar na tela 
inicial sem a pergunta apagada

## Teste - Responder dúvida (suporte) - RF-003

## Teste - Troca de pontos na loja - RF-004
- Passo a passo:
> Ter saldo suficiente:
> - Clicar no botão de troca no produto escolhido
- Troca realizada
- Saldo atualizado na tela e no JSON

> Não ter saldo suficiente:
> - Clicar no botão de troca no produto escolhido
- Mensagem informando que não há saldo suficiente para aquele produto


## Teste - Marcação de rota 
- Passo a passo:
> - Autorizar o acesso à localização
- Mapa aberto com a localização do usuário ao centro
> - Clicar ou digitar os endereços de origem e destino da rota
- Traçado da rota exibido no mapa
> - Selecionar como quero fazer a rota ou se quero o trajeto mais rápido
- Melhor rota exibida para aquele filtro selecionado

## Teste - Edição de rota - RF-007
- Passo a passo:
> - Após a marcação da rota desejada, trocar o endereço do local
> que quero ou clicar em cima do local no mapa
- Melhor rota exibida para aquele filtro selecionado

## Teste - Adicionar endereço

## Avaliação

> Discorra sobre os resultados do teste. Ressaltando pontos fortes e
> fracos identificados na solução. Comente como o grupo pretende atacar
> esses pontos nas próximas iterações. Apresente as falhas detectadas e
> as melhorias geradas a partir dos resultados obtidos nos testes.
