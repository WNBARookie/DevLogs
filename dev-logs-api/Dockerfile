FROM node:24-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /dev-logs-api

# copy configs to /dev-logs-api folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /dev-logs-api/src folder
COPY src /dev-logs-api/src

# check files list
RUN ls -a

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run" ,"start"]
