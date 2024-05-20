

# Biblioteca Back-end

Este é o projeto do Back-end para uma biblioteca, desenvolvido com Node.js, Express.js e MongoDB. Ele fornece uma API para cadastro de usuários, autenticação, gerenciamento de livros e geração de documentação usando o Swagger.

O site para acessar a documentação da API está disponível [aqui](https://library-back-end.vercel.app/doc/).

https://library-back-end.vercel.app/doc/

## Funcionalidades

- Cadastro de usuários
- Login de usuários
- Cadastro de livros
- Listagem de livros
- Busca de livros
- Atualização de livros
- Exclusão de livros

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB
- Swagger
- bcrypt
- jsonwebtoken

## Estrutura do Projeto

- **functions**: Contém tratamento de erros.

- **models**: Contém os modelos de dados do MongoDB.
  
- **routes**: Contém as rotas da API.

- **Swagger**: Contém os controladores de organização da documentação.

- **config**: Contém arquivos de configuração, como o arquivo de conexão com o banco de dados e as configurações do JWT.

- **middlewares**: Contém os middlewares utilizados na aplicação, como o middleware de autenticação e com mongodb conexão.

## Como Contribuir

Se você deseja contribuir para este projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua contribuição (`git checkout -b feature/SuaContribuicao`).
3. Faça commit das suas mudanças (`git commit -am 'Adicione sua contribuição'`).
4. Faça push para a branch (`git push origin feature/SuaContribuicao`).
5. Abra um Pull Request.

## Como Executar Localmente

Para executar este projeto localmente, siga estas etapas:

1. Clone este repositório:

git clone https://github.com/Cassio-Ares/library_Back-end.git


2. Renomeie o arquivo `EXEMPLO.env` na pasta raiz do projeto para `.env` para que as variáveis de ambiente sejam definidas corretamente.

npm install


3. Certifique-se de ter o MongoDB instalado e em execução.

4. Inicie o servidor:

npm start


5. Acesse a documentação da API no navegador através do endereço:

html://localhost:4000/
