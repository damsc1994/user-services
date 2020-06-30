FROM node
ENV work_dir /usr/src/user-services
RUN mkdir ${work_dir}
WORKDIR ${work_dir}
COPY package.json ${work_dir}
RUN npm install
COPY . ${work_dir}
EXPOSE 1801
CMD [ "npm", "start" ]