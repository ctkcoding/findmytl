FROM alpine

COPY script.sh /script.sh
RUN apk add --no-cache bash
RUN apk add --no-cache libc6-compat
RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/ctkcoding/Find-my-iphone.git

CMD ["/script.sh"]