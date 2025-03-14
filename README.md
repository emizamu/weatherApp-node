# weatherApp-node

This project is an interactive command-line application that allows users to search for cities, get geographical information, and check the current weather of selected locations. Data is retrieved using the Mapbox and OpenWeather APIs.

## Features

- **Search for cities**: Search for locations by city name and select a specific result from the list.
- **Check the weather**: Provides information about the current temperature, minimum, maximum, and general weather conditions of the selected location.
- **History**: Saves and displays a history of the last five searched cities.

## Requirements

- Node.js installed.
- API Key from [Mapbox](https://www.mapbox.com/) for geographical data.
- API Key from [OpenWeather](https://openweathermap.org/) for weather data.

## Usage

1. Run the application:

- node app

2. Select an option from the main menu:

- 1. Search City: Enter the name of a city to search for. Select a specific location from the results, and you will receive geographical and weather information.
- 2. History: View the last five searched cities.
- 0. Exit: Exit the application.

## Notes

 - Ensure your Mapbox and OpenWeather API keys are valid.
 - The search history is limited to five records and is stored locally in the db/database.json file.