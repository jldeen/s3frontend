FROM node:lts-alpine

ENV NODE_ENV=production

# AWS S3 ENV Variables
ENV AWS_ACCESS_KEY_ID=""
ENV AWS_SECRET_ACCESS_KEY=""
ENV S3_BUCKET_NAME=""
ENV AWS_S3_REGION=""

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["node", "server.js"]
