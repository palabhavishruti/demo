From node:18.7.0
WORKDIR ./app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 3004
CMD ["node","app.js"]