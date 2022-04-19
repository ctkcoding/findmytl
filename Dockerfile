FROM alpine

COPY script.sh /script.sh
RUN apk add --no-cache bash
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache git
RUN node --version
RUN git clone https://github.com/ctkcoding/findmynode.git
WORKDIR findmynode
RUN node bin/www

ENTRYPOINT ["tail", "-f", "/dev/null"]


# set user/pw for icloud, sqldb, sql ip/port

CMD ["/script.sh"]