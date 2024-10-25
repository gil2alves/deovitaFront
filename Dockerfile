# Etapa 1: Build
FROM node:16-alpine AS build

# Diretório de trabalho no container
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: Servir o conteúdo estático
FROM nginx:alpine

# Remove a configuração padrão do NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos gerados pelo build da aplicação React para a pasta do NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exposição da porta
EXPOSE 80

# Inicia o NGINX
CMD ["nginx", "-g", "daemon off;"]
