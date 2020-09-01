# url-shortener-api
Just for learn - Basic API for making short url


## Setup

rename .env.sample to *.env* and modify as needed.

`URL_SORT_API_PORT=3003`

`MONGO_URL_SHORT_DB_NAME=url-shortener`

`MONGO_URL_SHORT_DB_HOST=localhost`
`

## Run project

`$ npm install`

`$ node -r esm rvc-api.js`

## Endpoints

### **GET**: List shrinked urls:

**`http://{host}:{port}/list`**

### **POST**: Create new shrinked url:

**`http://{host}:{port}/`**

### **GET**: Use of the short link:

**`http://{host}:{port}/l/{ShortId}`**


### **DELETE**: Delete shrinked url:

**`http://{host}:{port}/`**

