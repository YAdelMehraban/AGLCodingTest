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