# Use a imagem oficial do Node.js 18 como base
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o arquivo `package.json` e `package-lock.json` para o contêiner
COPY package.json package-lock.json ./

# Remova dependências antigas e reinstale
RUN rm -rf node_modules package-lock.json && npm cache clean --force
RUN npm install

# Copie todo o código-fonte do aplicativo para o contêiner
COPY . .

RUN npm rebuild bcrypt --update-binary 

# Compile o código TypeScript
RUN npm run build

# Exponha a porta que o aplicativo irá ouvir
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD [ "npm", "run", "dev" ]



# FROM node:18 as builder

# WORKDIR /src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# RUN npm run build

# # Etapa final
# FROM node:18

# WORKDIR /src/app

# COPY --from=builder /src/app .

# EXPOSE 3000

# CMD ["npm", "run", "dev"]