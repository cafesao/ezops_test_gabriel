# Webchat Básico

## O que é?

É um webchat básico, você pode enviar mensagens de texto e todas as pessoas recebem quase que instantaneamente, graças ao Socket IO implementado neste projeto.

## Qual o objetivo do projeto?

É um desafio proposto pela EZOps para testar minhas capacidades de programação, com o webchat, ainda tem um CI/CD controlado pelo Jenkins e também a aplicação roda em um contêiner, com o Docker.

## Qual a responsabilidade do Jenkins?

A cada commit que eu fizer no código, o Jenkins se responsabiliza em fazer um pull desde commit, fazer o build da imagem e depois subir um contêiner que sera exposto para a internet.

## Conteúdo

- [Montando em sua maquina a aplicação](#montar_app)
- [Utilizando a aplicação na nuvem](#utilizar_nuvem)
- [Dica da aplicação](#dicas_app)

# Montando em sua maquina a aplicação

<a name="montar_app"/>

## Requerimentos

- [Docker](https://www.docker.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Pre-Passo 1

- Verifique se seu computador tem instalado o docker, usando o comando `docker -v`.
- Crie uma conta no MongoDB Atlas e crie um banco de dados FREE, ele sera utilizado para armazenar as conversas.

## Pre-Passo 2

Acesse o Atlas, clique no seu banco de dados e selecione a opção **connect**, depois clique em **Connect your application** e siga as instruções em como montar a sua URI, depois copie e deixe anotado.

## Passo 1

Acesse a pasta da aplicação pelo terminal: `cd ezops_test_gabriel`

## Passo 2

Crie um arquivo chamado **.env**, utilize seu editor de código favorito.

## Passo 3

Insira dois parâmetros neste arquivo:

- PORT = (A porta padrão é **3000** que esta sendo utilizado.)
- URI = (Insira a URI que você montou no Pre-Passo 2)

## Passo 4

Acesse a pasta public/assets/js e abra o arquivo script.js

## Passo 5

Na const `url_Server`, modifique para apontar para sua maquina local, no caso `http://localhost:<A porta que você colocou no passo 3, por padrão é 3000>`.

## Passo 6

Depois de ter feito tudo isso, vá até a raiz do projeto com o terminal e digite o comando `sudo docker build -t webchat:1.0 .`
Esse comando ira montar a imagem que você ira utilizar para iniciar o contêiner.

## Passo 7

Agora so falta iniciar o contêiner, então digite o comando `sudo docker run -d -p 3000:3000/tcp webchat:1.0`

Pronto a aplicação ja esta rodando em sua maquina, para verificar digite `sudo docker ps` e veja o contêiner que você criou iniciado e funcionando.

Note que na parte do código `-p 3000:3000/tcp`, caso você tenha modificado a porta padrão do servidor, você deve colocar a mesma porta aqui.

## Passo 8

Agora abra um navegador e digite `http://localhost:<A porta que você colocou no passo 3, por padrão é 3000>` e aproveite o webchat.

# Utilizando a aplicação na nuvem

<a name="utilizar_nuvem"/>

## Passo único

Abra um navegador e acesse o [Webchat](http://ec2-18-231-188-108.sa-east-1.compute.amazonaws.com:3000) e aproveite o webchat.

# Dica da aplicação

<a name="dicas_app"/>

Existe comandos que tem mensagens prontas, segue a lista:

Comando / Resposta do servidor

- !Ola: **Ola a todos!!,**
- !Adeus: **Adeus, espero que volte!!,**
- !Status: **Sistema operante e a todo vapor!,**
- !Gosto: **Eu gosto de conversar com vocês,**
- !Sistema: **Utilizo o sistema Ubuntu, em uma instância na AWS,**
- !Mestre: **Quem me criou foi meu mestre Cafesao :),**
- !Git: **Github: https://github.com/cafesao,**
- !Repo: **Repositório: https://github.com/cafesao/ezops_test_gabriel,**
