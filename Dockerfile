FROM node:12

ENV PORT 3000

# Set workdir directory
WORKDIR /usr/src/app

# Installing dependencies
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "start"