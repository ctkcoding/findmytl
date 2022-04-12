FROM alpine

COPY script.sh /script.sh
RUN apk add --no-cache bash
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache git
RUN git clone https://github.com/ctkcoding/Find-my-iphone.git
WORKDIR find-my-iphone
RUN npm run devStart

CMD ["/script.sh"]