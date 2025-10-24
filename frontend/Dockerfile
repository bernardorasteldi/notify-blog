FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5173

# Inicia o Vite com modo host para acessar via localhost
CMD ["npm", "run", "dev", "--", "--host"]
