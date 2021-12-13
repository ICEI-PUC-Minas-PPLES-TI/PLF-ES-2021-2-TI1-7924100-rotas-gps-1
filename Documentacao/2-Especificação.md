# Especificações Do Projeto

## Personas

1. **Wellington** tem 47 anos, e já foi motorista de ônibus e taxi. Ele mora no centro da cidade e tem carro próprio que o possibilita ser motorista de aplicativo de viagem, sua principal fonte de renda aliás. Por não ter muito poder aquisitivo, o Wellington vive sofrendo com a mal optimização dos aplicativos de GPS em seu celular, além de reclamar muito dos diversos problemas ocasionados nas rotas geradas automaticamente. Outro problema que afeta negativamente a vida do motorista é a dificuldade de entender o mapa do aplicativo, por ter uma interface muito poluída com informações desnecessárias para a usabilidade dele.

2. **Adriano** tem 35 anos e também é motorista de aplicativo de viagem, além de ser entregador de aplicativo (motoboy). Por morar em uma região periférica, tem muito apreço pela segurança, tanto no trânsito como pessoal. Ele é extremamente pontual e não gosta de atrasos, por isso se sente muito frustrado quando as viagens demoram mais do que o informado pelos aplicativos. Atualmente ele resolve esse problema ele negocia com o cliente para não ter problemas. Outro problema que afeta a vida do Adriano é ausência de indicação da elevação das ruas. Quando elas são muito íngremes, o carro dele não consegue subi-las.

3. **Luiz** tem 26 anos e é um profissional liberal. Ele sai de casa quase todos os dias, inclusive nos finais de semana para lazer, e por não ter carro próprio, ele utiliza aplicativos de viagem e entrega. Por ser um usuário ativo desses serviços, ele se sente irritado quando o GPS do aplicativo de viagem erra o caminho, causando-lhe um atraso, ou quando algum produto erra o endereço. Ele tem o sonho de comprar um carro próprio e parar de usar esses aplicativos.

4. **Guilherme** tem 25 anos e mora na região central da cidade. Ele é recém habilitado e já tem carro próprio. Por não ter muita experiência no trânsito e muito menos com mapas e GPS, ele se depara com muitos problemas no dia-dia com os aplicativos de rotas GPS. Um exemplo é quando o carro morre em um local muito movimentado, isso deixa-o extremamente irritado e nervoso. Ele soluciona esse problema optando por fazer rotas que passam em ruas com o trânsito mais tranquilo, o que é um pouco difícil para ele. Outra dor que o Guilherme sofre é com ausência de opiniões de outros usuários sobre uma determinasda rota ou local.  


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO... `FUNCIONALIDADE`    |PARA... `MOTIVO/VALOR`       |
|--------------|------------------------------------------------------------------|--------------------------------------------------------------|
|Wellington    | Mapa sempre atualizado                                           | O cálculo automático da rota seja mais preciso               |
|Wellington    | Menos informações na tela e o percurso mais visível              | Facilitar a visualização da rota e torná-la mais prática     |
|Adriano       | Mapa mostre as áreas possivelmente perigosas                     | Evitar essas áreas e escolher uma região mais segura         |
|Adriano       | O aplicativo informe os trechos com o trânsito mais carregado    | Poder evitar e ganhar tempo de viagem                        |
|Adriano       | Escolher o perfil do percurso                                    | Adaptar a rota de acordo com a necessidade do cliente        |
|Adriano       | Mostrar a elevação da ruas                                       | Evitar locais muito íngremes onde o carro não consegue subir  |
|Luiz          | A rota automática seja mais precisa                              | Chegar no destino no tempo estipulado e o produto não erre mais o endereço |
|Luiz          | Editar a rota caso ela esteja errada                             | Não passar por frustrações e não atrasar para os compromissos|
|Guilherme     | Filtrar certos tipos de rotas                                    | Evitar passar em locais com muito trânsito, por exemplor     |
|Guilherme     | Possibilidade de visulizar os feedbacks de outros usuários de determinadas rotas ou locais | Facilitar a identificação de buracos nas vias, árvores caídas, etc|


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito                            | Prioridade |
|------|---------------------------------------------------    |-----|
|RF-001| Mostrar áreas perigosas no mapa                       | ALTA | 
|RF-002| Mapa com atualizações recorrentes                     | ALTA | 
|RF-003| Feedbacks dos usuários quanto às rotas                | ALTA |
|RF-004| Mostrar a elevação da ruas                            | ALTA |
|RF-005| Informar trechos mais carregados, congestionados      | MÉDIA |
|RF-006| Editar a rota do usuário                              | MÉDIA |
|RF-007| Filtrar rotas de acordo com a preferência do usuário  | MÉDIA |
|RF-008| Escolher o perfil do percurso                         | BAIXA |
|RF-009| Cadastro de usuário                                   | BAIXA |
|RF-010| Efetuar Login                                         | BAIXA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Interface limpa                     | ALTA | 
|RNF-002| Percurso claro e visível            | ALTA |
|RNF-003| Compatível com os principais navegadores | ALTA |
|RNF-004| A rota automática mais precisa    | MÉDIA |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| O projeto deve solucionar todos os requisitos supracitados |
|03| O trabalho deve limitar-se apenas para sites Web |
