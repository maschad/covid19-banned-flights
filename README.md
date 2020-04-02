<!-- @format -->

# See Coronavirus Travel Restrictions, Across the Globe

### [A demo here](https://covid19-banned-flights.herokuapp.com/)

This project utilizes [pomber's](https://github.com/pomber/covid19) time series JSON API as well as a scraper that I built [here](https://github.com/maschad/covid-scraper). As well as [vasturiano's](https://github.com/vasturiano/react-globe.gl) react globe library.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Setting up

Because this project requires a backend, you can run the [scraper](https://github.com/maschad/covid-scraper) I mentioned before

## Docker Instructions

If you have [Docker](https://www.docker.com/) then:

- Build an image
  ```
  docker build -t <your username>/banned-flights
  ```
- Run that image

  ```
  docker run -d <your username>/banned-flights
  ```

- Ensure it's running
  ```
  docker ps
  ```
