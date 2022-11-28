<h1 align="center">
  アノニマスボット
</h1>

<p align="center">
  <a href="#" target="blank">
    <img src="https://i.imgur.com/Herlri9.png" width="200" alt="Nest Logo" style="border-radius: 50%" />
  </a>
</p>

<p align="center">
  Discord bot for the Anonymous da Favela server.
</p>

## About The Project
Projeto criado para os usuários do servidor dos Anonymous da Favela, o bot inicialmente serve como um bot de música convencional. Aplica técnicas de OOP e funciona em conjunto tanto para comandos por **mensagem** tanto para **comandos slash**.

A inspiração o nome está no próprio nome do grupo, ***アノニマス*** (anonimasu), é uma adaptação da palavra ***anonymous*** (anônimo) provinda da língua inglesa para a japonesa.


## Built With
- [Node v16][node16]
- [TypeScript v4.9][ts4.9]
- [Babel v7][babel7]

## Getting Started
For the use of the project, some prerequisites will be necessary.

### Prerequisites (Windows)
* Node
  1. You can download here: [Node][node_url]
  2. Here is a step-by-step installation tutorial. [(Tutorial)][node_tutorial]

<br>

### .env variables
> You need to create an .env file inside the project root. You can also create `.env.development` and `.env.production`.

```toml
TOKEN="token" # String: Discord bot token
LIST_ENDPOINTS=False | True # Boolean: Whether endpoints will be presented on launch
MONGODB_DATABASE="database_name"
MONGODB_URL="mongodb+srv//..."
MONGODB_USER="admin"
MONGODB_PASSWORD="123456"
```

<br>

### Installation and usage
1. After the clone, inside the root of the project, run:
    ```sh
    npm i
    ```
2. Already with a `.env` file configured, run:
    ```sh
    npm run dev
    ```

    Or if you wish, it is also possible:

    ```sh
    npm run prod
    ```
3.  Done, the whole process has been completed 🎉

<br>

## Roadmap (Portuguese)
If you are interested, you can see our roadmap [here][roadmap_url].


## Contributors
| [<div><img width=115 src="https://avatars.githubusercontent.com/u/54884313?v=4"><br><sub>Alexandre Ferreira de Lima</sub></div>][arekushi] |
| :---: |


<!-- [Build With] -->
[node16]: https://nodejs.org/en/blog/release/v16.16.0/
[ts4.9]: https://www.typescriptlang.org/docs/
[babel7]: https://babeljs.io/docs/en/


<!-- [Some links] -->
[node_url]: https://nodejs.org/en/download/
[node_tutorial]: https://phoenixnap.com/kb/install-node-js-npm-on-windows

[roadmap_url]: https://arekushi.notion.site/Roadmap-in-Portuguese-d333b887fdaf4cab9a335d31090d2173


<!-- [Constributors] -->
[arekushi]: https://github.com/Arekushi
