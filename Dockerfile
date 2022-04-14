FROM node:alpine
COPY . /app
WORKDIR /app

ENTRYPOINT ["./entrypoint.sh"]
