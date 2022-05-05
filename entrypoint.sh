#!/bin/sh -l

cd fiubify-mobile
npm install
npm test
apk --no-cache add curl
curl -Os https://uploader.codecov.io/latest/linux/codecov
chmod +x codecov
CODECOV_TOKEN=37685e39-909f-4ec9-87b9-64e6a0ede2c1 ./codecov -R /..
