FROM nginx:alpine
# Cloud Run sets the PORT environment variable (default 8080).
# We modify the default nginx config to listen on this port.
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
EXPOSE 8080
