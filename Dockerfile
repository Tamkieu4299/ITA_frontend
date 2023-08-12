# build stage

FROM node:18.14.1 as build-stage

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

# production stage

FROM nginx:stable-alpine as production-stage

COPY ./nginx_config.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /usr/share/nginx/html

COPY --from=build-stage /app/.env /usr/share/nginx/html/.env

RUN apk add --update nodejs

RUN apk add --update yarn

RUN yarn global add runtime-env-cra@0.2.4

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]
