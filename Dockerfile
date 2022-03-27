### 2. BUILD ###
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", ".babelrc", "./"]
RUN npm install -g npm
RUN npm install --silent

COPY . .
EXPOSE 8787

### 2. RUN ###
CMD ["npm", "run", "prod"]

# docker build -t anonimasu-bot:latest .
# docker run -p 8888:8888 anonimasu-bot:latest
