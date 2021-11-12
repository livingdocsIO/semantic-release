FROM node:16-alpine
ADD . /release
WORKDIR /release

RUN apk add tini git bash --no-cache && \
    npm ci && \
    npm cache clear --force && \
    rm -rf \
      /usr/share/man/tmp/* \
      /root/.npm /root/.node-gyp \
      /usr/lib/node_modules

ENTRYPOINT ["/sbin/tini", "-g", "--", "/release/run.sh"]
