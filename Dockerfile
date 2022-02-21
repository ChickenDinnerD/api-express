FROM node
WORKDIR /node-typescript
COPY . .
COPY ./docker-entrypoint.sh /home/node-typescript/docker-entrypoint.sh
RUN npm i
RUN chmod +x /home/node-typescript/docker-entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/home/node-typescript/docker-entrypoint.sh"]
