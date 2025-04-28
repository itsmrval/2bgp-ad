FROM node:lts AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

RUN echo 'worker_processes 1;' > /etc/nginx/nginx.conf \
 && echo '' >> /etc/nginx/nginx.conf \
 && echo 'events { worker_connections 1024; }' >> /etc/nginx/nginx.conf \
 && echo '' >> /etc/nginx/nginx.conf \
 && echo 'http {' >> /etc/nginx/nginx.conf \
 && echo '    include       mime.types;' >> /etc/nginx/nginx.conf \
 && echo '    default_type  application/octet-stream;' >> /etc/nginx/nginx.conf \
 && echo '' >> /etc/nginx/nginx.conf \
 && echo '    sendfile        on;' >> /etc/nginx/nginx.conf \
 && echo '    keepalive_timeout  65;' >> /etc/nginx/nginx.conf \
 && echo '' >> /etc/nginx/nginx.conf \
 && echo '    server {' >> /etc/nginx/nginx.conf \
 && echo '        listen 80;' >> /etc/nginx/nginx.conf \
 && echo '        server_name localhost;' >> /etc/nginx/nginx.conf \
 && echo '' >> /etc/nginx/nginx.conf \
 && echo '        root /usr/share/nginx/html;' >> /etc/nginx/nginx.conf \
 && echo '        index index.html;' >> /etc/nginx/nginx.conf \
 && echo '' >> /etc/nginx/nginx.conf \
 && echo '        location / {' >> /etc/nginx/nginx.conf \
 && echo '            try_files $uri /index.html;' >> /etc/nginx/nginx.conf \
 && echo '        }' >> /etc/nginx/nginx.conf \
 && echo '' >> /etc/nginx/nginx.conf \
 && echo '        error_page 404 /index.html;' >> /etc/nginx/nginx.conf \
 && echo '' >> /etc/nginx/nginx.conf \
 && echo '        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|otf)$ {' >> /etc/nginx/nginx.conf \
 && echo '            expires 1y;' >> /etc/nginx/nginx.conf \
 && echo '            access_log off;' >> /etc/nginx/nginx.conf \
 && echo '            add_header Cache-Control "public";' >> /etc/nginx/nginx.conf \
 && echo '        }' >> /etc/nginx/nginx.conf \
 && echo '' >> /etc/nginx/nginx.conf \
 && echo '        location ~ /\. {' >> /etc/nginx/nginx.conf \
 && echo '            deny all;' >> /etc/nginx/nginx.conf \
 && echo '        }' >> /etc/nginx/nginx.conf \
 && echo '    }' >> /etc/nginx/nginx.conf \
 && echo '}' >> /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
