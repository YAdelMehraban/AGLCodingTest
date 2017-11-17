# AGL Coing Test
##### By Yaser Mehraban

This project consists of a set of API's which consume the AGL coding test API and return the full list and also list of all the cats grouped by the gender of their owners. It also has a client side SPA application written in Angular v4 using Angular CLI which consumes the API's and shows the list of cats in the home page.

The API project is written in ASP.Net Core 2.0 and the client application 

### Running in debug mode

Navigate to `Web` folder and run the below commands in a command prompt or PS command line:

```Powershell
dotnet restore
dotnet run
```

Now the web API project is running and listening on `http://localhost:5000`;

Open up another command prompt and run the dotnet project:

```javascript
npm install
npm start
``` 
It is time to open a browser and navigigate to `http://localhost:4200` to see the home page of the Angular SPA application.

### Run in production mode

Open a command line and type these commands:

```Poweshell
npm install
npm run publish <=or=> ng build --prod

dotnet restore
dotnet run
```

Now if you navigate to `http://localhost:5000` you will see the home page with all the cats.

### Running xUnit tests

In order to run the tests you can just simply type:

    dotnet test
    
If you want to run the `Jasmine` tests, you can use:

    npm test

The Angular tests will run in a headless Chrome. If you want to change that please open up the `karma.config.js` and change the browser to whichever you prefer.
    
### Docker

To run the application in docker container run the commands blow:

    npm install
    npm run publish <=or=> ng build --prod

    docker-compose  -f ".\docker-compose.yml" -f ".\docker-compose.override.yml" -f ".\obj\Docker\docker-compose.vs.debug.g.yml" -p dockercompose2966794116290414041 up -d

 This will create the docker image and run it. Now you need to know the address:

 First let's get the container id:
     
     docker ps --filter "status=running" --filter "name=dockercompose2966794116290414041_web_" --format "{{.ID}}" -n 1

Now run:

    docker inspect --format="{{.NetworkSettings.Networks.nat.IPAddress}}" <ID from previous command>

This will give you the address where the app is running.