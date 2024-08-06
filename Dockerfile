# Use a imagem oficial do Node.js 18 como base
FROM node:18

RUN useradd --user-group --create-home --shell /bin/false appuser

# Instale o Yarn globalmente
RUN which yarn || npm install -g yarn

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app
RUN chown -R appuser:appuser /usr/src/app

# Copie o arquivo `package.json` e `yarn.lock` para o contêiner
COPY package.json ./ 

# Alterne para o usuário não root
USER appuser

# Instale as dependências usando o Yarn
RUN yarn install

# Copie todo o código-fonte do aplicativo para o contêiner
COPY . .

RUN npm rebuild bcrypt --update-binary 
# Compile o código TypeScript
RUN yarn build

# Exponha a porta que o aplicativo irá ouvir
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD [ "yarn", "dev" ]