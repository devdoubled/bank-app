FROM node:22 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# ---- Test stage ----
FROM base AS test
CMD ["npm", "test"]

# ---- Run stage ----
FROM base AS run
CMD ["node", "demo.js"]
