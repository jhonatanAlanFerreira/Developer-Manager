# Developer Manager

[comment]: <> (Demonstração online https://jhonatanferreira.me/developer-manager)

<kbd>
  <img src="https://raw.githubusercontent.com/jhonatanAlanFerreira/potential-crud/master/screenshot/screenshot.png" alt="Screen Shot">
  <br>
</kbd>

> Um crud para gerenciar cadastros de desenvolvedores e seus níveis(Ex: Junior, Pleno, Senior) feito com Angular no frontend, Node no backend, Mongo como banco de dados e docker na criação do container.

### Ajustes e melhorias

* Será feito um login simples para listar registros apenas do usuário logado

## 💻 Pré-requisitos

Necessário ter Docker instalado.
<br>https://docs.docker.com/get-docker

## ☕ Usando Developer Manager

Execute o comando `docker-compose up -d` na pasta do projeto, vai demorar alguns minutos até o docker gerar o container, quando terminar o projeto vai estar executando na porta 3000, é só acessar http://localhost:3000.

## 🌟 Features 
* Testes unitários.

* Lazy loading, carrega apenas o módulo usado com base na rota. 

* Busca pelo nome do desenvolvedor ou nível.
 
* Ordenação pelo nome da coluna asc e desc.

* Paginação.

* Responsividade.

## 📋 Documentação da API

<table>
  <thead>
    <tr>
      <th>Rota</th>
      <th>Verbo</th>
      <th>Acão</th>
      <th>Parâmetros</th>
      <th>Corpo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>localhost:3000/api/developers</td>
      <td>GET</td>
      <td>Lista todos os desenvolvedores</td>
      <td>
        <ul>
          <li> <b>nome, sexo, datanascimento, idade, hobby, nivel</b> são colunas para busca.</li>
          <li> <b>page</b> é usado para paginação.</li>
          <li> <b>limit</b> é a quantidade de resultados para paginação.</li>
          <li> <b>orderBy</b> define a coluna em que os resultados serão ordenados.</li>
          <li> <b>direction</b> é a direção da ordenação, pode ser usado <b>asc</b> ou <b>desc</b>.</li>
        </ul>
        Exemplo:
        <b>localhost:3000/api/developers?nivel=Pleno&nome=jhonatan&page=1&limit=10&orderBy=nome&direction=asc</b>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>localhost:3000/api/developers/{id}</td>
      <td>GET</td>
      <td>Mostra os dados de um desenvolvedor</td>
      <td>Id do desenvolvedor</td>
      <td></td>
    </tr>
    <tr>
      <td>localhost:3000/api/developers/{id}</td>
      <td>DELETE</td>
      <td>Deleta um desenvolvedor</td>
      <td>Id do desenvolvedor</td>
      <td></td>
    </tr>
    <tr>
      <td>localhost:3000/api/developers</td>
      <td>POST</td>
      <td>Inseri um desenvolvedor</td>
      <td></td>
      <td>
        {
        "nome": "Nome",
        "sexo": "M",
        "idade": 29,
        "hobby": "Hobby",
        "datanascimento": "1993-10-20",
        "nivel": "{id}"
        }
      </td>
    </tr>
    <tr>
      <td>localhost:3000/api/developers/{id}</td>
      <td>PUT</td>
      <td>Atualiza um desenvolvedor</td>
      <td>Id do desenvolvedor</td>
      <td>
        {
        "nome": "Nome",
        "sexo": "M",
        "idade": 29,
        "hobby": "Hobby",
        "datanascimento": "1993-10-20",
        "nivel": "{id}"
        }
      </td>
    </tr>
    <tr>
      <td>localhost:3000/api/levels</td>
      <td>GET</td>
      <td>Lista todos os níveis</td>
      <td>
        <ul>
          <li> <b>nivel</b> é a coluna para busca.</li>
          <li> <b>page</b> é usado para paginação.</li>
          <li> <b>limit</b> é a quantidade de resultados para paginação.</li>
          <li> <b>orderBy</b> define a coluna em que os resultados serão ordenados.</li>
          <li> <b>direction</b> é a direção da ordenação, pode ser usado <b>asc</b> ou <b>desc</b>.</li>
        </ul>
        Exemplo:
        <b>localhost:3000/api/levels?nivel=Pleno&page=1&limit=10&orderBy=nome&direction=asc</b>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>localhost:3000/api/levels/{id}</td>
      <td>GET</td>
      <td>Mostra os dados de um nível</td>
      <td>Id do nível</td>
      <td></td>
    </tr>
    <tr>
      <td>localhost:3000/api/levels/{id}</td>
      <td>DELETE</td>
      <td>Deleta um nível</td>
      <td>Id do nível</td>
      <td></td>
    </tr>
    <tr>
      <td>localhost:3000/api/levels</td>
      <td>POST</td>
      <td>Inseri um nível</td>
      <td></td>
      <td>
        {
        "nivel": "Nível"
        }
      </td>
    </tr>
    <tr>
      <td>localhost:3000/api/levels/{id}</td>
      <td>PUT</td>
      <td>Atualiza um nível</td>
      <td>Id do nível</td>
      <td>
        {
        "nivel": "Nível"
        }
      </td>
    </tr>
  </tbody>
</table>
