# Gestão de Configuração

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório `master`, que é o principal no qual o [GitHub Pages](https://pages.github.com/) carrega nosso projeto.

O projeto segue a seguinte convenção para o nome de branchs:

- `master`: versão estável já testada do software, a versão de produção
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `ajuda necessária`: É necessária atenção extra

- `aprimoramento`: Novo recurso ou solicitação

- `bug`: Algo não está funcionando

- `dúvida`: Mais informações são necessárias

- `Daniel`: Responsabilidade do Daniel

- `deixa pra lá`: Isso não será trabalhado

- `documentação`: Melhorias ou acréscimos à documentação

- `duplicado`: Este problema ou solicitação de pull já existe

- `Extra`: Coisas que faremos se sobrar tempo

- `Fred`: Responsabilidade do Fred

- `Futura funcionalidade`: Funcionalidades que serão feitas futuramente

- `good first issues`: Instruções para recém-chegados

- `Igor`: Responsabilidade do Igor

- `inválido`: Existe algo incorreto

- `Nikolas`: Responsabilidade do Nikolas

- `Rafael`: Responsabilidade do Rafael

- `Sprint 2`: Todas as coisas que são da Sprint 2

- `Sprint 3`: Todas as coisas que são da Sprint 3

### Commits

Para a realização de commits, foi adotada a seguinte convenção:

- `feat`: Nova funcionalidade
- `chore`: Qualquer mudança que não altere esteticamente ou a execução do código, como exclusão de arquivos não utilizados por exemplo.
- `fix`: Correção de bugs ou outros erros.

Além disso, foi o adotado o uso de frases objetivas e no imperativo para descrever o que estava sendo alterado, como por exemplo:

`feat: Adicionar função de alterar pontuação do usuário.`

## Hospedagem

O projeto foi lançado na plataforma de hospedagem do próprio GitHub, o GitHub Pages, que consiste em um serviço que compila os arquivos de HTML, CSS e JavaScript dos próprios repositórios adicionados ao GitHub.

> - [GitHub Pages](https://pages.github.com/)

Foi configurado o usu da branch `master` para uso no GitHub Pages.