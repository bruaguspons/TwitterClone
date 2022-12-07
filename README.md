# Twitter Clone
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express" alt="Express" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
   <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original-wordmark.svg" title="MongoDb" alt="MongoDb" width="40" height="40"/>&nbsp;
</div>

This repo is functionality complete — PRs and issues welcome!

# Getting started

To get the Node server running locally:

- Clone this repo
- `cd server` to go to the server files
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server

To get the client running locally:

- Clone this repo
- `cd client` to go to the client files
- `npm install` to install all required dependencies
- `npm run dev` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 

## Application Structure

- `client/app.jsx` - The entry point to our client application.
- `server/index.js` - The entry point to our server application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `server/routes/` - This folder contains the route definitions for our API.
- `server/models/` - This folder contains the schema definitions for our Mongoose models.

## Fake Data

For a better experience you should run the file "fakeData.js" on server `node fakeData.js` this will create 10 fake users.
