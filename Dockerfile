from node:14

copy . .

workdir /frontend/potential-crud

run npm install && npm run build

workdir /backend/potential-crud-api

run npm install

expose 3000 4200

cmd ["npm", "start"]