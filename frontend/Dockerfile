# Build React app
FROM node:lts AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

RUN echo 'events {}' > /etc/nginx/nginx.conf \
    && echo 'http {' >> /etc/nginx/nginx.conf \
    && echo '  server {' >> /etc/nginx/nginx.conf \
    && echo '    listen 80;' >> /etc/nginx/nginx.conf \
    && echo '    root /usr/share/nginx/html;' >> /etc/nginx/nginx.conf \
    && echo '    index index.html;' >> /etc/nginx/nginx.conf \
    && echo '' >> /etc/nginx/nginx.conf \
    && echo '    location / {' >> /etc/nginx/nginx.conf \
    && echo '      try_files $uri /index.html;' >> /etc/nginx/nginx.conf \
    && echo '    }' >> /etc/nginx/nginx.conf \
    && echo '  }' >> /etc/nginx/nginx.conf \
    && echo '}' >> /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
