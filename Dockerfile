FROM node:14-stretch

ARG VERSION
ARG BUILD
ARG BRANCH
ARG BACKEND_URL
ARG APP_ADDRESS

ENV VERSION=${VERSION} \
    BRANCH=${BRANCH} \
    BUILD=${BUILD} \
    TARGET_ENV=production \
    BACKEND_URL=${BACKEND_URL} \
    APP_ADDRESS=${APP_ADDRESS}

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends apt-utils && \
    apt-get install -y nginx yarn && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN yarn global add @quasar/cli
#RUN yarn global add @cloudflare/wrangler

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install

COPY . /app

ENV NODE_ENV=production

RUN yarn run build && \
    rm -rf /var/www/html && \
    mv /app/dist/spa /var/www/html

RUN yarn run build:pwa && \
    mv /app/dist/pwa /var/www/html/pwa && \
    mkdir -p /var/www/html/.well-known && \
    cp -r /app/src-pwa/.well-known/assetlinks.json /var/www/html/.well-known && \
    mkdir -p /var/www/html/pwa/.well-known && \
    cp -r /app/src-pwa/pwa/.well-known/assetlinks.json /var/www/html/pwa/.well-known

ENTRYPOINT ["/bin/sh"]

CMD ["docker-serve.sh"]
