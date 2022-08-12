FROM node:16
COPY ["package.json","package-lock.json","/usr/uv/app/"]
WORKDIR /usr/uv/app
RUN npm install
COPY [".","/usr/uv/app/"]
RUN npm run build
EXPOSE ${REACT_APP_UI_PORT}
CMD ["npx", "serve", "-l", "$REACT_APP_UI_PORT", "-s", "build"]