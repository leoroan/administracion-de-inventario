FROM node:18
WORKDIR /app
COPY package*.json ./
# RUN rm -rf node_modules
RUN npm install --omit=dev
COPY . .
EXPOSE 8080
CMD ["npm", "start"]

# comando para levantar la imagen con variables de entorno:
# docker run -e DB_DATABASE=actasWeb -e DB_USER=desarrollomt -e DB_PASSWORD=Bondman-oil-flout -e DB_HOST=172.22.26.106 -e DB_PORT=3306 -e PORT=8081 -p 8080:8081 -e MAILING_BASE_URL=http://localhost:5173 -e FRONTEND_ORIGIN=http://localhost:5173 actasweb-back

# docker run --dns="172.22.10.231" -p 8080:8081 -e PORT=8080 -e DB_DATABASE=actasWeb -e DB_USER=app_actasWeb -e DB_PASSWORD= -e DB_HOST= -e DB_PORT=3306 -e MAILING_BASE_URL=https://actasweb.vtv.gba.gob.ar -e FRONTEND_ORIGIN=https://actasweb.vtv.gba.gov.ar  actasweb-back &