FROM node:20.11.0

RUN npm install pm2 -g
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "preview"]
