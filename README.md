## Como rodar o projeto

Instalando as dependências

```bash
$ npm i
```

As configurações devem ser feitas no arquivo `.env` na raiz do projeto, seguindo o seguinte formato

```env
CLIENT_ID=
CLIENT_SECRET=
SECRET=
```

Após configurar as variáveis de ambiente, é necessário executar as migrations do banco de dados.
Isto irá configurar e popular o banco de dados inicialmente, alem de buscar e salvar a chave de acesso para a api do [[IGDB]].

Para rodar esse comando é necessário executar:

```bash
$ npm run typeorm -- migration:run
```

Para rodar o projeto basta utilizar o comando

```bash
$ npm run dev
```
