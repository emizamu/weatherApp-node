const {select, input, confirm, checkbox} = require ('@inquirer/prompts');
require('colors');


    const inquirerMenu = async () => {

        console.clear();
        console.log('========================='.green);
        console.log('  Seleccione una opción'.green);
        console.log('========================='.green);
        
        const questions = await select ({
            message: '¿Que desea hacer?',
            choices: [
                {name: `${'1.'.green} Buscar Ciudad`, value: 1},
                {name: `${'2.'.green} Historial`, value: 2},
                {name: `${'0.'.green} Salir`, value: 0},
            ]
        }); 

        return questions;

    };
    
    const pause = async () => {
        console.log();
        await input({ message: `Presione ${'ENTER'.green} para continuar` });
    }
    
    const question = async (message = '') => {
        console.log();
        const answer = await input({message, required: true});
        return answer;
    }


    const listOfPlaces = async (places = [] ) => {
        
        const choices = places.map((place, i) => {
            
            const indx = `${i + 1}. `.green;

            return {
                value: place.id,
                name: `${indx} ${place.name}`
            }
        });

        const questions = await select (
            {   
                message: 'Opciones encontradas',
                choices
            }
        );

        return questions;

    }
 

    
    module.exports = {
        inquirerMenu,
        pause,
        question,
        listOfPlaces,
    }