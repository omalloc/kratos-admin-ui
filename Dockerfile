FROM nginx:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf

ADD .deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
