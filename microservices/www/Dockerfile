FROM mhart/alpine-node:8.0.0

WORKDIR /src

ADD src/package.json /src/
# Add app source files
ADD src /src

#install node modules
RUN npm install

CMD ["node", "index.js"]
