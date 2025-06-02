FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install --omit=dev
# expressS
EXPOSE 8082

CMD ["npm", "start"]

# docker run -p 3000:8082 be-back-tst &S