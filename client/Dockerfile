# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
# Optional: bake API base URL into the build (client code should read process.env.REACT_APP_API_URL)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
COPY . .
RUN npm run build

# Runtime: static file server
FROM node:20-alpine
WORKDIR /srv
RUN npm i -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
