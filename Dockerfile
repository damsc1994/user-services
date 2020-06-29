FROM node
RUN mkdir /usr/src/user-services
WORKDIR /usr/src/user-services
COPY package.json /usr/src/user-services
RUN npm install
COPY . /usr/src/user-services
EXPOSE 1801
CMD [ "npm", "start" ]