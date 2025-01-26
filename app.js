const {inquirerMenu, pause, question, listOfPlaces} = require('./helpers/inquirer');
const Searches = require('./models/searches');
require('dotenv').config();

main = async () => {

    let opt = 0;

    const searches = new Searches();

    do {
        console.clear();

        opt = await inquirerMenu();

        switch(opt){
            case 1:
                // Mostrar mensaje
                const input = await question('Indique ciudad:');
                // Buscar lugares
                const placesFound = await searches.searchCity(input);
                // Seleccionar Lugar
                const placeID = await listOfPlaces(placesFound);
                const placeSelected = placesFound.find(place => place.id === placeID);
                // Clima
                
                // Mostrar resultados
                console.log(`\nInformación de la ciudad\n`.green);
                console.log('Ciudad:', placeSelected.name);
                console.log('Lng:',placeSelected.lng);
                console.log('Lat:',placeSelected.lat);
                console.log('Temperatura:',);
                console.log('Minima:',);
                console.log('Maxima:',);

                break;
            case 2:
                break;
        }

        if(opt != 0) await pause();

    } while (opt != 0);

} 


main();