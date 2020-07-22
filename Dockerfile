FROM node:12-alpine AS build

# Set workdir directory
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm install

# Copying source files
COPY . /app

# Building app
RUN npm run build

FROM node:12-alpine

RUN NODE_OPTIONS=--max-old-space-size=8192

# Set workdir directory
WORKDIR /app

# copy from build image
COPY --from=build /app /app

EXPOSE 3000

# Running the app
CMD "npm" "run" "start"