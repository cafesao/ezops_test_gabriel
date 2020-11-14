FROM mhart/alpine-node:10
WORKDIR /backend
COPY package.json ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]