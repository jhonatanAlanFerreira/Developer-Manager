from node:14

copy . .

workdir /frontend/potential-crud

run npm install --no-package-lock && npm run build

workdir /backend/potential-crud-api

run npm install

expose 3000

cmd ["npm", "start"]