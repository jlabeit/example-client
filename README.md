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

### POST /api/routes
The body should contain a json object with attributes
- `queries`:  Array of queries specifying legs of a route. Each with at least a start and a destination.
- `profile`:  car` or `truck` specifying speed profiles and enabling/disabling truck restrictions.

#### queries
An array of queries containing the following attributes.
- `start`: coordinates of the start of the route.
- `destination`: coordinates of the end of the route.
- `viaPoints` (optional): Array of coordinates through which the route should pass.

Each coordinates must have is a json object with two attirbutes:
- `lat`: Latitude of the coordinate.
- `lon`: Longitude of the coordinate.

#### Example body
```
{
  "queries":
     [
        {"start":{"lon":9.07,"lat":49.79},
        "destination":{"lon":9.25,"lat":49.7},
        "viaPoints":[ {"lat":49.78500915875961,"lon":9.218196203136415}]}
       ],
    "profile":"truck"
 }
```

### POST /api/toll
The body should contain a json object with the attributes
- `routes`: Array of tolls details from the response of `/api/routes` request. 
- `settings`: Settings specifying how to compute the toll for the given routes.

#### routes
The `routes` parameter specifies the routes the toll is calculated for. `routes` should be obtain by calling the api endpont `/api/routes` and obtain the response data `tolls`.

#### settings
The `settings` parameter specifies the vehicle and time of day the toll is calculted for. The following options are available.

| parameter     | possible values           | description  |
| ------------- |:-------------:| -----:|
| axis          | `2` `3` `4` `5` | Number of axis the vehicle has (including trailer axis). For more than 5 axis pass 5. |
| weight        | `3.5 - 40.0` |  Floating point number specifying the maximm vehicle weight (zulässiges Gesamtgewicht) in tonnes.  |
| euronorm      |`0` `1` `2` `3` `4` `5` `6` `EEV`  |   Eurocode of the vehicle exhaust emissions class. |
| time          | `day` `night` `rushhour`      |   Time of day the route is driven. `day` corresponds to `5:00 - 22:00`, night corresponds to `22:00 - 05:00` and `rushhour` to friday afternoon. |

#### Example body
```
{
    "routes":[[{"country":"DE","distances":[30679,4147,714],"toll_booths":[]}]],
    "settings":{"axis":"5","weight":40,"euronorm":"5","time":"day"}
}
```
