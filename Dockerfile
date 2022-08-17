FROM node:16
WORKDIR /usr/src/coleta-seletiva-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 4040
CMD npm start
