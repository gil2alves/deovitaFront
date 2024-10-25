
# React App Dockerized

Este projeto é uma aplicação React que pode ser executada dentro de um container Docker. Abaixo estão as instruções para construir e rodar o projeto utilizando Docker.

## Pré-requisitos

- **Docker**: Certifique-se de que o Docker está instalado no seu sistema. Você pode verificar a instalação com o seguinte comando:
  ```bash
  docker --version
  ```

## Construindo a Imagem Docker

No diretório raiz do projeto, execute o seguinte comando para construir a imagem Docker:

```bash
docker build -t react-app .
```

Isso criará uma imagem chamada `react-app` a partir do `Dockerfile` localizado no diretório do projeto.

## Executando o Container

Após construir a imagem, você pode executar o container com o comando:

```bash
docker run -p 3000:80 react-app
```

Este comando fará o seguinte:

- **`-p 3000:80`**: Mapeia a porta **3000** do seu host (computador) para a porta **80** do container, onde a aplicação React está sendo servida pelo NGINX.
- Acesse a aplicação em [http://localhost:3000](http://localhost:3000) no seu navegador.

## Resolvendo Conflitos de Porta

Se você tiver outro serviço rodando na porta **3000**, pode alterar o mapeamento da porta do host. Por exemplo, para usar a porta **3001** no seu host, execute:

```bash
docker run -p 3001:80 react-app
```

Agora, a aplicação estará acessível em [http://localhost:3001](http://localhost:3001).

## Observações

- Certifique-se de que você está no diretório correto do projeto ao executar os comandos.
- Este projeto utiliza NGINX dentro do container Docker para servir a aplicação React após o build.
"# deovitaFront" 
