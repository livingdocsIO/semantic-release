FROM livingdocs/node:22
ADD . /release
WORKDIR /release

RUN npm ci && \
  npm cache clear --force && \
  rm -rf \
    /usr/share/man/tmp/* \
    /root/.npm /root/.node-gyp \
    /usr/lib/node_modules

ENTRYPOINT ["/release/run.sh"]
