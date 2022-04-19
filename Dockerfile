FROM node:alpine as base

RUN apk add --no-cache bash
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache git

# COPY script.sh /script.sh
# CMD ["/script.sh"]

RUN node --version
# RUN npm install express
RUN git clone https://github.com/ctkcoding/findmynode.git

WORKDIR /findmynode

RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean
CMD ["node", "./bin/www"]





RUN npm start

ENTRYPOINT ["tail", "-f", "/dev/null"]


# set user/pw for icloud, sqldb, sql ip/port
