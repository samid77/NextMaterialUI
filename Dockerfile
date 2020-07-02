FROM node:12-alpine AS build

ENV PORT 3000

# Set workdir directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build

FROM node:12-alpine

# Set workdir directory
WORKDIR /usr/src/app

# copy from build image
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE $APP_PORT

# Running the app
CMD "npm" "run" "start"