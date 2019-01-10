This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm install`

Installs all needed dependencies.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Overview

This example projects talks to the two IMPARGO production APIs.
To signup for an account goto [apps.impargo.de](https://apps.impargo.de).

There are 4 example API calls made to either `http://services.impargo.de:5000` (graphql) or `https://apps.impargo.de/api` (REST).

1. Perform login via the graphql api (`src/Login.js`).
2. Retrieve list of all vehicles connected to the account via graphql api (`src/Vehicles.js`).
3. Compute the route (including distance and travel time) between two geocodes via REST api (`src/Routing.js`).
4. Compute truck toll for the given route via REST api (`src/Routing.js`)
