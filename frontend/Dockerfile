# Build Stage
FROM node:21-alpine as build
# Install angular cli
RUN npm install -g @angular/cli
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --silent

# Copy the entire project
COPY . .
# Install gulp-cli
RUN npm install -g gulp-cli
# Build the Angular app and process with Gulp
RUN npm run build --prod --base-href / && npx gulp frontend-build

# Production Stage
FROM nginx:stable-alpine as production
COPY --from=build /app/frontend/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]