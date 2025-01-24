const {inquirerMenu, pause, question} = require('./helpers/inquirer');
const Searches = require('./models/searches')

main = async () => {

    let opt = 0;

    const searches = new Searches();

    do {

        opt = await inquirerMenu();

        switch(opt){
            case 1:
                // Mostrar mensaje
                const place = await question('Indique ciudad:');
                console.log(place);
                // Buscar lugares
                // Seleccionar Lugar
                // Clima
                // Mostrar resultados
                console.log(`\nInformación de la ciudad\n`.green);
                console.log('Ciudad:',);
                console.log('Lat:',);
                console.log('Lng:',);
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