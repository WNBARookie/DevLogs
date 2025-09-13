FROM node:24-alpine
# update packages
RUN apk update

# create root application folder
WORKDIR /dev-logs-ui

# copy configs to /dev-logs-ui folder
COPY package.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Run npm i
RUN npm install


# Copy the full project 
COPY . .

# check files list
RUN ls -a


# Build Vite project
RUN npm run build


# Expose port
EXPOSE 4200


#Run start command
CMD [ "npm", "run" ,"start"]

