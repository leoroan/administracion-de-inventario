FROM node:lts-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install --omit=dev
# expressS
EXPOSE 8082

CMD ["npm", "start"]