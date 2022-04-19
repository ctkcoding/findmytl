FROM node:alpine as base

# RUN apk add --no-cache bash
# RUN apk add --no-cache libc6-compat
# RUN apk add --no-cache git

RUN apt-get update
RUN apt-get install -y git
RUN git clone https://github.com/ctkcoding/findmynode.git
WORKDIR /findmynode
RUN node --version

# set user/pw for icloud, sqldb, sql ip/port
CMD ["npm", "start"]
