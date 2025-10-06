FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
# Ensure your app listens on 0.0.0.0:5000 in index.js
EXPOSE 5000
CMD ["node", "index.js"]
