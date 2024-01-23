FROM node:latest AS builder
WORKDIR /app
COPY ./*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm prune

FROM node:latest
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]








#FROM node AS builder
#WORKDIR /app
#COPY /*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#RUN npm prune
#
#
#FROM node:21-alpine
#WORKDIR /app
#COPY --from=builder /app ./
#EXPOSE 3001
##CMD ["npm", "run", "dev"]
#CMD ["node", ".output/server/index.mjs"]