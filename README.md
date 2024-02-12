# Nuxt FrontTest

Projeto criado para teste de frontend utilizando o scafolding do [Nuxt 3](https://nuxt.new/)

## Atenção: Para executar esse projeto é necessário a versão 18.0.0 ou mais recente do NodeJs

### Instruções para execução

##### Download do projeto e instalação das dependências

```bash
$ git clone https://github.com/tvmota/nuxt-front-test.git
$ cd nuxt-front-test
#----------Execução_Com_NPM---------
$ npm i
#----------Execução_Com_YARN---------
$ yarn
```

##### Execução do servidor de desenvolvimento

```bash
#----------Navegar para dentro da pasta do projeto---------
$ cd nuxt-front-test
#----------Execução_Com_NPM---------
$ npm run dev
#----------Execução_Com_YARN---------
$ yarn dev
```

Após executar o comando será possível acessar o projeto no browser no endereço: [http://localhost:3000/](http://localhost:3000/)

##### Geração do build para deploy ou preview(localhost)

```bash
#----------Navegar para dentro da pasta do projeto---------
$ cd nuxt-front-test
#----------Execução_Com_NPM---------
$ npm run build
#----------Execução_Com_YARN---------
$ yarn build
```

##### Preview da versão de produção em um server local (Este passo deve ser executado após a execução do build)

```bash
#----------Navegar para dentro da pasta do projeto---------
$ cd nuxt-front-test
#----------Execução_Com_NPM---------
$ npm run preview
#----------Execução_Com_YARN---------
$ yarn preview
```

### Libs utilizadas

- **Framework SSR**: [Nuxt](https://nuxt.com/).
- **Toolkit CSS**: [Tailwind](https://tailwindcss.com/)
  Biblioteca utilitária que prove classes básicas para construções de componentes
- **Processador CSS**: [Postcss](https://postcss.org/)
  Processador css que utiliza plugins para pré-processar o css
- **yup**: [Yup](https://github.com/jquense/yup) Validador de objetos utilizado para validaçãode formulários.
