FROM node:20 AS builder

WORKDIR /app


COPY ./package-docker.json ./package.json
COPY ./package-lock.json ./
COPY ./uploads ./uploads
COPY .babelrc .
# RUN npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-typescript @babel/plugin-syntax-top-level-await

COPY . .

RUN npm install mongoose@8.9.4 --save-exact

RUN npx babel ./src --out-dir ./dist --extensions ".js,.mjs,.ts" --copy-files --out-file-extension .js

EXPOSE 3000

CMD ["node", "./dist/server.js"]

# --experimental-print-required-tla
# node ./dist/server.js