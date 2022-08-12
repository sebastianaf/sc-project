FROM node:16
COPY ["package.json","package-lock.json","/usr/uv/app/"]
WORKDIR /usr/uv/app
RUN npm install
COPY [".","/usr/uv/app/"]
RUN npm run build
EXPOSE ${API_PORT}
CMD ["dist/index.js"]
ENTRYPOINT ["node"]