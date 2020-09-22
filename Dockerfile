FROM node:12-alpine
WORKDIR /home/insect
COPY package.json ./
RUN yarn --pure-lockfile && \
    yarn cache clean
COPY . .
EXPOSE 9191
ENTRYPOINT ["npm", "run", "web"]
