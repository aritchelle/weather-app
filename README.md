Welcome to the Weather App! This application utilizes Next.js for front-end development, along with OpenWeatherMap API for current weather data and WeatherAPI for historical weather data.

## Features:

- Current Weather: Get real-time weather updates for any location worldwide.
- Weather History: Access historical weather data for a specific location and date.
- Unit Selection: Choose between metric, imperial, and standard units for temperature and other weather metrics.

## Setting up locally

To run the Weather App locally, follow these steps:

1. Clone or download this repository to your local machine.
2. Open the project in your preferred IDE.
3. Make sure you have NodeJS installed on your computer. You can download it [here](https://nodejs.org/en/).
4. Install all dependencies by running `npm install` in your terminal from the root directory of the cloned folder.
5. Create a new file named `.env` in the root directory of the project. and add 2 variables;
   `NEXT_PUBLIC_OPENWEATHERMAP_API_KEY` and `NEXT_PUBLIC_WEATHER_API_KEY`
6. Obtain API keys from [OpenWeatherMap](https://openweathermap.org/) and [WeatherAPI](https://www.weatherapi.com).
7. run the development serve `npm run dev`

## Usage

### Current Weather:

1.  Enter a location in the search bar.
2.  Press Enter or click on the search button.
3.  View the current weather conditions for the specified location.

### Weather History:

1.  Navigate to the History page.
2.  Enter a location and date in the provided fields.
3.  Click on the "Get History" button to retrieve historical weather data.

### Unit Selection:

1.  Choose between metric, imperial, and standard units(default).

## Technologies Used:

1. Next.js,zustand(state management) Tailwind, React-query. Shadcn, lucide-icons.
2. OpenWeatherMap API
3. WeatherAPI
   - Weather api is use for history temperature since OpenweatherMap has no longer history for free tiers.
4. chart.js
