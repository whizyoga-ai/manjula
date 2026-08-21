FROM nginx:1.29-alpine

LABEL org.opencontainers.image.title="Manjula Bite & Brew"
LABEL org.opencontainers.image.description="Static manjulab.com website"
LABEL org.opencontainers.image.source="https://github.com/whizyoga-ai/manjula"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/.git \
    /usr/share/nginx/html/.github \
    /usr/share/nginx/html/docs \
    /usr/share/nginx/html/scripts \
    /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/nginx.conf \
    /usr/share/nginx/html/CNAME \
    /usr/share/nginx/html/README.md \
    /usr/share/nginx/html/.gitignore \
    /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/.nojekyll

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
