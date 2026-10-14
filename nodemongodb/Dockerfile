FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# Instalamos nodemon para el hot reload
RUN npm install -g nodemon 
COPY . .
EXPOSE 3005
# Comando por defecto para producción
CMD ["node", "index.js"]