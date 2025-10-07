FROM node:20-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production

# Install LaTeX with packages needed for awesome-cv resume
RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-xetex \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-luatex \
    fonts-font-awesome \
    && rm -rf /var/lib/apt/lists/* \
    && fc-cache -fv

COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
# Ensure your app listens on 0.0.0.0:5000 in index.js
EXPOSE 5000
CMD ["node", "index.js"]
