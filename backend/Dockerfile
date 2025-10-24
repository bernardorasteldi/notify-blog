# Usa Node 22 (LTS) baseado no Alpine, imagem leve e estável
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta usada pelo Express
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
